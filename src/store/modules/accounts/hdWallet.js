/* eslint no-param-reassign: ['error', { 'ignorePropertyModificationsFor': ['state'] }] */

import { pick } from 'lodash-es';
import Vue from 'vue';
import { generateMnemonic, mnemonicToSeed } from '@aeternity/bip39';
import {
  Crypto, TxBuilder, TxBuilderHelper, SCHEMA,
} from '@aeternity/aepp-sdk';
import BigNumber from 'bignumber.js';
import { MAGNITUDE } from '../../../lib/constants';
import {
  derivePasswordKey, generateHdWallet, genRandomBuffer, getHdWalletAccount,
} from '../../utils';
import AES from '../../../lib/aes';
import { i18n } from '../../plugins/ui/languages';

const type = `hd-wallet${process.env.IS_MOBILE_DEVICE ? '' : '-desktop'}`;

export default {
  namespaced: true,

  account: {
    type,
    getTypeVerbose: () => i18n.t('hd-wallet.account-name'),
    color: 'primary',
  },

  state: {
    encryptedWallet: null,
    passwordDerivedKey: null,
    mnemonic: '',
    mnemonicBackedUp: false,
    wallet: null,
  },

  getters: {
    nextIdx: (state, getters, rootState, rootGetters) => Math.max(
      ...rootGetters['accounts/getByType'](type).map(({ source: { idx } }) => idx),
      -1,
    ) + 1,
    isWalletEncrypted: ({ encryptedWallet }) => encryptedWallet && !!encryptedWallet.mac,
  },

  mutations: {
    setEncryptedWallet(state, encryptedWallet) {
      state.encryptedWallet = encryptedWallet;
    },

    setPasswordDerivedKey(state, passwordDerivedKey) {
      state.passwordDerivedKey = passwordDerivedKey;
    },

    setMnemonic(state, mnemonic) {
      state.mnemonic = mnemonic;
    },

    markMnemonicAsBackedUp(state) {
      state.mnemonicBackedUp = true;
    },

    setWallet(state, wallet) {
      state.wallet = wallet;
      this.getters['accounts/getByType'](type)
        .forEach((account) => {
          const { address, ...source } = getHdWalletAccount(state.wallet, account.source.idx);
          Vue.set(account, 'address', address);
          Vue.set(account, 'source', { ...account.source, ...source });
        });
    },

    logout(state) {
      state.passwordDerivedKey = null;
      state.mnemonic = '';
      state.wallet = null;
      this.getters['accounts/getByType'](type)
        .forEach((account) => {
          account.source = pick(account.source, ['type', 'idx']);
        });
    },
  },

  actions: {
    async isAccountUsed({ rootState: { sdk } }, address) {
      const { api } = sdk.then ? await sdk : sdk;
      return api.getAccountByPubkey(address).then(() => true, () => false);
    },

    async checkPreviousAndCreate({ dispatch, rootGetters }) {
      const { address } = rootGetters['accounts/getByType'](type).pop();
      if (!await dispatch('isAccountUsed', address)) {
        await dispatch(
          'modals/open',
          {
            name: 'confirm',
            text: i18n.t('hd-wallet.new-account-warning'),
            primaryButtonText: i18n.t('im-sure'),
          },
          { root: true },
        );
      }
      return dispatch('create');
    },

    logout: {
      root: true,
      handler: ({ commit }) => commit('logout'),
    },

    async discover({
      state, getters, commit, dispatch,
    }) {
      let account;
      do {
        if (account) {
          commit('accounts/add', { ...account, type }, { root: true });
        }
        account = getHdWalletAccount(state.wallet, getters.nextIdx);
        // eslint-disable-next-line no-await-in-loop
      } while (await dispatch('isAccountUsed', account.address));
    },

    handleUnlock: ({ state: { mnemonicBackedUp }, dispatch }, isCreate) => Promise.all([
      dispatch('discover'),
      type === 'hd-wallet' && (async () => {
        if (isCreate) {
          await dispatch('modals/open', { name: 'proposeToOpenSecurityCourses' }, { root: true });
        }
        if (!mnemonicBackedUp) {
          await dispatch('modals/open', { name: 'notificationMnemonicBackup' }, { root: true });
        }
      })(),
    ]),

    async createWallet({ commit, dispatch }, mnemonic) {
      if (mnemonic) commit('markMnemonicAsBackedUp');
      const newMnemonic = mnemonic || generateMnemonic();
      commit('setMnemonic', newMnemonic);
      commit('setEncryptedWallet', { mnemonic: newMnemonic });
      commit('setWallet', generateHdWallet(mnemonicToSeed(newMnemonic)));
      dispatch('create');
      await dispatch('handleUnlock', true);
    },

    async setWalletPassword({ state: { wallet, mnemonic }, commit }, password) {
      if (password) {
        const salt = genRandomBuffer(16);
        const newPasswordDerivedKey = await derivePasswordKey(password, salt);
        commit('setPasswordDerivedKey', newPasswordDerivedKey);
        const aes = new AES(newPasswordDerivedKey);
        commit('setEncryptedWallet', {
          ...mnemonic ? {
            mnemonic: await aes.encrypt(Buffer.from(mnemonic)),
          } : {
            privateKey: await aes.encrypt(wallet.privateKey),
            chainCode: await aes.encrypt(wallet.chainCode),
          },
          mac: await aes.encrypt(new Uint8Array(2)),
          salt,
        });
      } else {
        commit('setPasswordDerivedKey', null);
        commit('setEncryptedWallet', mnemonic ? { mnemonic } : wallet);
      }
    },

    async changeWalletPassword({ getters, dispatch }, { password, newPassword } = {}) {
      if (getters.isWalletEncrypted) {
        if (password) await dispatch('deriveAndCheckPasswordKey', password);
        else await dispatch('modals/open', { name: 'ensureKnowPassword' }, { root: true });
      }
      await dispatch('setWalletPassword', newPassword);
    },

    async deriveAndCheckPasswordKey({ state: { encryptedWallet } }, password) {
      const passwordDerivedKey = await derivePasswordKey(password, encryptedWallet.salt);
      const aes = new AES(passwordDerivedKey);
      if (encryptedWallet.mnemonic) {
        await aes.decrypt(encryptedWallet.mnemonic);
      } else {
        await aes.decrypt(encryptedWallet.privateKey);
        await aes.decrypt(encryptedWallet.chainCode);
      }
      const mac = new Uint8Array(await aes.decrypt(encryptedWallet.mac));
      if (mac.reduce((p, n) => p || n !== 0, false)) throw new Error('Wrong password');
      return passwordDerivedKey;
    },

    async unlockWallet({
      state: { encryptedWallet }, getters: { isWalletEncrypted }, commit, dispatch,
    }, password) {
      let wallet;
      if (isWalletEncrypted) {
        const passwordDerivedKey = await dispatch('deriveAndCheckPasswordKey', password);
        const aes = new AES(passwordDerivedKey);
        commit('setPasswordDerivedKey', passwordDerivedKey);

        wallet = encryptedWallet.mnemonic ? {
          mnemonic: Buffer.from(await aes.decrypt(encryptedWallet.mnemonic)).toString(),
        } : {
          privateKey: await aes.decrypt(encryptedWallet.privateKey),
          chainCode: await aes.decrypt(encryptedWallet.chainCode),
        };
      } else wallet = encryptedWallet;
      if (wallet.mnemonic) {
        commit('setMnemonic', wallet.mnemonic);
        wallet = generateHdWallet(mnemonicToSeed(wallet.mnemonic));
      }
      commit('setWallet', wallet);
      await dispatch('handleUnlock');
    },

    async deleteMnemonic({ state: { passwordDerivedKey, encryptedWallet, wallet }, commit }) {
      if (passwordDerivedKey) {
        const aes = new AES(passwordDerivedKey);
        commit('setEncryptedWallet', {
          privateKey: await aes.encrypt(wallet.privateKey),
          chainCode: await aes.encrypt(wallet.chainCode),
          mac: await aes.encrypt(new Uint8Array(2)),
          salt: encryptedWallet.salt,
        });
      } else {
        commit('setEncryptedWallet', wallet);
      }
      commit('setMnemonic', '');
    },

    create({ state: { wallet }, getters: { nextIdx }, commit }) {
      commit('accounts/add', {
        ...getHdWalletAccount(wallet, nextIdx), active: true, type,
      }, { root: true });
    },

    signWithoutConfirmation({ rootGetters }, data) {
      return Crypto.sign(data, rootGetters['accounts/active'].source.secretKey);
    },

    async confirmRawDataSigning({ dispatch }, data) {
      await dispatch('modals/open', { name: 'confirmSign', data }, { root: true });
      return data;
    },

    async confirmTxSigning({ dispatch }, txBinary) {
      let txObject;
      try {
        txObject = TxBuilder.unpackTx(txBinary, true).tx;
      } catch (e) {
        return dispatch('confirmRawDataSigning', txBinary);
      }

      const SUPPORTED_TX_TYPES = [
        SCHEMA.TX_TYPE.spend, SCHEMA.TX_TYPE.contractCreate, SCHEMA.TX_TYPE.contractCall,
        SCHEMA.TX_TYPE.namePreClaim, SCHEMA.TX_TYPE.nameClaim, SCHEMA.TX_TYPE.nameUpdate,
        SCHEMA.TX_TYPE.nameTransfer,
      ];
      if (!SUPPORTED_TX_TYPES.includes(SCHEMA.OBJECT_ID_TX_TYPE[txObject.tag])) {
        return dispatch('confirmRawDataSigning', txBinary);
      }

      const format = (value) => BigNumber(value).shiftedBy(-MAGNITUDE);
      const confirmProps = {
        name: 'confirmTransactionSign',
        transaction: {
          ...txObject,
          amount: txObject.amount && format(txObject.amount),
          fee: format(txObject.fee),
          minFee: format(
            TxBuilder.calculateFee(
              0,
              SCHEMA.OBJECT_ID_TX_TYPE[txObject.tag],
              { gas: txObject.gas, params: txObject, vsn: txObject.VSN },
            ),
          ),
          nameFee: txObject.nameFee && format(txObject.nameFee),
        },
      };

      return TxBuilder.buildTx(
        {
          ...txObject,
          fee: (await dispatch('modals/open', confirmProps, { root: true }))
            .shiftedBy(MAGNITUDE),
        },
        SCHEMA.OBJECT_ID_TX_TYPE[txObject.tag],
        { vsn: txObject.VSN },
      ).rlpEncoded;
    },

    async sign({ dispatch }, data) {
      await dispatch('confirmRawDataSigning', data);
      return dispatch('signWithoutConfirmation', data);
    },

    async signTransaction({ dispatch, rootState: { sdk } }, txBase64) {
      const encodedTx = await dispatch('confirmTxSigning', TxBuilderHelper.decode(txBase64, 'tx'));
      const signature = await dispatch(
        'signWithoutConfirmation',
        Buffer.concat([Buffer.from(sdk.getNetworkId()), Buffer.from(encodedTx)]),
      );
      return TxBuilder.buildTx({ encodedTx, signatures: [signature] }, SCHEMA.TX_TYPE.signed).tx;
    },
  },
};

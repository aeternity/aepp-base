/* eslint no-param-reassign: ['error', { 'ignorePropertyModificationsFor': ['state'] }] */

import { pick } from 'lodash-es';
import Vue from 'vue';
import { generateMnemonic, mnemonicToSeed } from '@aeternity/bip39';
import { Crypto, TxBuilder } from '@aeternity/aepp-sdk/es';
import { OBJECT_ID_TX_TYPE, TX_TYPE } from '@aeternity/aepp-sdk/es/tx/builder/schema';
import BigNumber from 'bignumber.js';
import { MAGNITUDE } from '../../../lib/constants';
import {
  derivePasswordKey, generateHdWallet, genRandomBuffer, getHdWalletAccount,
} from '../../utils';
import AES from '../../../lib/aes';
import { getDesktopRemoveSignAction } from './utils';
import { i18n } from '../../plugins/ui/languages';

export default {
  namespaced: true,

  account: {
    type: 'hd-wallet',
    getTypeVerbose: () => i18n.t('hd-wallet.account-name'),
    color: 'primary',
  },

  state: process.env.IS_MOBILE_DEVICE ? {
    encryptedWallet: null,
    passwordDerivedKey: null,
    mnemonic: '',
    mnemonicBackedUp: false,
    wallet: null,
  } : {},

  getters: process.env.IS_MOBILE_DEVICE ? {
    nextIdx: (state, getters, rootState, rootGetters) => Math.max(
      ...rootGetters['accounts/getByType']('hd-wallet').map(({ source: { idx } }) => idx),
      -1,
    ) + 1,
    isWalletEncrypted: ({ encryptedWallet }) => encryptedWallet && !!encryptedWallet.mac,
  } : {},

  mutations: process.env.IS_MOBILE_DEVICE ? {
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
      this.getters['accounts/getByType']('hd-wallet')
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
      this.getters['accounts/getByType']('hd-wallet')
        .forEach((account) => {
          account.source = pick(account.source, ['type', 'idx']);
        });
    },
  } : {},

  actions: process.env.IS_MOBILE_DEVICE ? {
    logout: {
      root: true,
      handler: ({ commit }) => commit('logout'),
    },

    async discover({
      state, getters, rootState: { sdk }, commit,
    }) {
      const { api } = sdk.then ? await sdk : sdk;
      let account;
      do {
        if (account) {
          commit('accounts/add', { ...account, type: 'hd-wallet' }, { root: true });
        }
        account = getHdWalletAccount(state.wallet, getters.nextIdx);
      } while (await api // eslint-disable-line no-await-in-loop
        .getAccountByPubkey(account.address).then(() => true, () => false));
    },

    handleUnlock: ({ state: { mnemonicBackedUp }, dispatch }, isCreate) => Promise.all([
      dispatch('discover'),
      (async () => {
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
        ...getHdWalletAccount(wallet, nextIdx), active: true, type: 'hd-wallet',
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
        TX_TYPE.spend, TX_TYPE.contractCreate, TX_TYPE.contractCall,
        TX_TYPE.namePreClaim, TX_TYPE.nameClaim, TX_TYPE.nameUpdate, TX_TYPE.nameTransfer,
      ];
      if (!SUPPORTED_TX_TYPES.includes(OBJECT_ID_TX_TYPE[txObject.tag])) {
        return dispatch('confirmRawDataSigning', txBinary);
      }

      const format = value => BigNumber(value).shiftedBy(-MAGNITUDE);
      const confirmProps = {
        name: 'confirmTransactionSign',
        transaction: {
          ...txObject,
          amount: txObject.amount && format(txObject.amount),
          fee: format(txObject.fee),
          minFee: format(TxBuilder.calculateFee(
            0, OBJECT_ID_TX_TYPE[txObject.tag], { gas: txObject.gas, params: txObject },
          )),
          nameFee: txObject.nameFee && format(txObject.nameFee),
        },
      };

      return TxBuilder.buildTx(
        {
          ...txObject,
          fee: (await dispatch('modals/open', confirmProps, { root: true }))
            .shiftedBy(MAGNITUDE),
        },
        OBJECT_ID_TX_TYPE[txObject.tag],
        { vsn: txObject.VSN },
      ).rlpEncoded;
    },

    async sign({ dispatch }, data) {
      await dispatch('confirmRawDataSigning', data);
      return dispatch('signWithoutConfirmation', data);
    },

    async signTransaction({ dispatch, rootState: { sdk } }, txBase64) {
      const encodedTx = await dispatch(
        'confirmTxSigning',
        Crypto.decodeBase64Check(Crypto.assertedType(txBase64, 'tx')),
      );
      const signature = await dispatch(
        'signWithoutConfirmation',
        Buffer.concat([Buffer.from(sdk.getNetworkId()), encodedTx]),
      );
      return TxBuilder.buildTx({ encodedTx, signatures: [signature] }, TX_TYPE.signed).tx;
    },
  } : {
    create({ dispatch }) {
      return dispatch('remoteConnection/call', { name: 'createAccount' }, { root: true });
    },
    sign: getDesktopRemoveSignAction('sign'),
    signTransaction: getDesktopRemoveSignAction('signTransaction'),
  },
};

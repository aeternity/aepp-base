import { pick } from 'lodash-es';
import Vue from 'vue';
import { generateMnemonic, mnemonicToSeed } from '@aeternity/bip39';
import {
  buildTx,
  unpackTx,
  Tag,
  encode,
  decode,
  Encoding,
  MemoryAccount,
} from '@aeternity/aepp-sdk-next';
import BigNumber from 'bignumber.js';
import { MAGNITUDE } from '../../../lib/constants';
import {
  derivePasswordKey,
  generateHdWallet,
  genRandomBuffer,
  getHdWalletAccount,
} from '../../utils';
import AES from '../../../lib/aes';
import { i18n } from '../../plugins/ui/languages';

const type = `hd-wallet${ENV_MOBILE_DEVICE ? '' : '-desktop'}`;

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
    nextIdx: (state, getters, rootState, rootGetters) =>
      Math.max(...rootGetters['accounts/getByType'](type).map(({ source: { idx } }) => idx), -1) +
      1,
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
      this.getters['accounts/getByType'](type).forEach((account) => {
        const { address, ...source } = getHdWalletAccount(state.wallet, account.source.idx);
        Vue.set(account, 'address', address);
        Vue.set(account, 'source', { ...account.source, ...source });
      });
    },

    logout(state) {
      state.passwordDerivedKey = null;
      state.mnemonic = '';
      state.wallet = null;
      this.getters['accounts/getByType'](type).forEach((account) => {
        account.source = pick(account.source, ['type', 'idx']);
      });
    },
  },

  actions: {
    async isAccountUsed({ rootGetters: { node } }, address) {
      return node.getAccountByPubkey(address).then(
        () => true,
        () => false,
      );
    },

    async checkPreviousAndCreate({ dispatch, rootGetters }) {
      const { address } = rootGetters['accounts/getByType'](type).pop();
      if (!(await dispatch('isAccountUsed', address))) {
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

    async discover({ state, getters, commit, dispatch }) {
      let account;
      do {
        if (account) {
          commit('accounts/add', { ...account, type }, { root: true });
        }
        account = getHdWalletAccount(state.wallet, getters.nextIdx);
      } while (await dispatch('isAccountUsed', account.address));
    },

    handleUnlock: ({ state: { mnemonicBackedUp }, dispatch }, isCreate) =>
      Promise.all([
        dispatch('discover'),
        type === 'hd-wallet' &&
          (async () => {
            if (isCreate) {
              await dispatch(
                'modals/open',
                { name: 'proposeToOpenSecurityCourses' },
                { root: true },
              );
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
          ...(mnemonic
            ? {
                mnemonic: await aes.encrypt(Buffer.from(mnemonic)),
              }
            : {
                privateKey: await aes.encrypt(wallet.privateKey),
                chainCode: await aes.encrypt(wallet.chainCode),
              }),
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

    async unlockWallet(
      { state: { encryptedWallet }, getters: { isWalletEncrypted }, commit, dispatch },
      password,
    ) {
      let wallet;
      if (isWalletEncrypted) {
        const passwordDerivedKey = await dispatch('deriveAndCheckPasswordKey', password);
        const aes = new AES(passwordDerivedKey);
        commit('setPasswordDerivedKey', passwordDerivedKey);

        wallet = encryptedWallet.mnemonic
          ? {
              mnemonic: Buffer.from(await aes.decrypt(encryptedWallet.mnemonic)).toString(),
            }
          : {
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
      commit(
        'accounts/add',
        {
          ...getHdWalletAccount(wallet, nextIdx),
          active: true,
          type,
        },
        { root: true },
      );
    },

    signWithoutConfirmation({ rootGetters }, data) {
      const sk = rootGetters['accounts/active'].source.secretKey;
      const acc = new MemoryAccount(encode(sk.subarray(0, 32), Encoding.AccountSecretKey));
      return acc.sign(data);
    },

    async confirmRawDataSigning({ dispatch }, { data, signal }) {
      await dispatch('modals/open', { name: 'confirmSign', data, signal }, { root: true });
      return data;
    },

    async confirmTxSigning({ dispatch }, { transaction, signal }) {
      let txObject;
      try {
        txObject = unpackTx(transaction);
      } catch (e) {
        return encode(
          await dispatch('confirmRawDataSigning', { data: decode(transaction), signal }),
          Encoding.Transaction,
        );
      }

      const SupportedTags = [
        Tag.SpendTx,
        Tag.ContractCreateTx,
        Tag.ContractCallTx,
        Tag.NamePreclaimTx,
        Tag.NameClaimTx,
        Tag.NameUpdateTx,
        Tag.NameTransferTx,
      ];
      if (!SupportedTags.includes(txObject.tag)) {
        return encode(
          await dispatch('confirmRawDataSigning', { data: decode(transaction), signal }),
          Encoding.Transaction,
        );
      }

      const format = (value) => BigNumber(value).shiftedBy(-MAGNITUDE);
      const confirmProps = {
        name: 'confirmTransactionSign',
        signal,
        transaction: {
          ...txObject,
          amount: txObject.amount && format(txObject.amount),
          fee: format(txObject.fee),
          minFee: format(unpackTx(buildTx({ ...txObject, fee: undefined })).fee),
          nameFee: txObject.nameFee && format(txObject.nameFee),
        },
      };

      return buildTx({
        ...txObject,
        fee: (await dispatch('modals/open', confirmProps, { root: true })).shiftedBy(MAGNITUDE),
      });
    },

    async sign({ dispatch }, { data, signal }) {
      await dispatch('confirmRawDataSigning', { data, signal });
      return dispatch('signWithoutConfirmation', data);
    },

    async signTransaction({ dispatch, rootGetters: { node } }, { transaction, signal }) {
      const txWithFee = await dispatch('confirmTxSigning', { transaction, signal });
      const signature = await dispatch(
        'signWithoutConfirmation',
        Buffer.concat([Buffer.from(await node.getNetworkId()), decode(txWithFee)]),
      );
      return buildTx({ tag: Tag.SignedTx, encodedTx: txWithFee, signatures: [signature] });
    },
  },
};

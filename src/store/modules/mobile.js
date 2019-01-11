/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */

import Vue from 'vue';
import { Crypto } from '@aeternity/aepp-sdk/es';
import { mnemonicToSeed } from '@aeternity/bip39';
import { generateHDWallet } from '@aeternity/hd-wallet/src';
import AES from '../../lib/aes';
import { genRandomBuffer, derivePasswordKey } from '../utils';

export default {
  state: {
    keystore: null,
    derivedKey: null,
    accountCount: 0,
    accounts: {},
    followers: {},
    names: [],
    showAccountSwitcher: false,
  },

  getters: {
    addresses: ({ accounts }) => Object.keys(accounts),
    loggedIn: ({ keystore, derivedKey }) => !!(keystore && derivedKey),
  },

  mutations: {
    setKeystore(state, keystore) {
      state.keystore = keystore;
    },
    setDerivedKey(state, derivedKey) {
      state.derivedKey = derivedKey;
    },
    resetAccountCount(state) {
      state.names = ['My First Account'];
      state.accountCount = 1;
    },
    createIdentity(state, name) {
      state.names.push(name);
      state.accountCount += 1;
    },
    renameIdentity(state, { index, name }) {
      Vue.set(state.names, index, name);
    },
    setAccounts(state, accounts) {
      state.accounts = accounts
        .reduce((p, n) => ({ ...p, [Crypto.aeEncodeKey(n.publicKey)]: n }), {});
    },
    signOut(state) {
      state.keystore = null;
      state.derivedKey = null;
    },
    addFollower(state, follower) {
      Vue.set(state.followers, follower.id, follower);
    },
    removeFollower(state, followerId) {
      Vue.delete(state.followers, followerId);
    },
    followerConnected(state, followerId) {
      Vue.set(state.followers[followerId], 'connected', true);
    },
    followerDisconnected(state, followerId) {
      Vue.delete(state.followers[followerId], 'connected');
      Vue.set(state.followers[followerId], 'disconnectedAt', Date.now());
    },
    toggleAccountSwitcher(state) {
      state.showAccountSwitcher = !state.showAccountSwitcher;
    },
  },

  actions: {
    async createKeystore({ commit }, { password, seed }) {
      const salt = genRandomBuffer(16);
      const passwordDerivedKey = await derivePasswordKey(password, salt);
      const aes = new AES(passwordDerivedKey);
      const hdWallet = generateHDWallet(mnemonicToSeed(seed));
      const encryptedHdWallet = {
        privateKey: await aes.encrypt(hdWallet.privateKey),
        chainCode: await aes.encrypt(hdWallet.chainCode),
        mac: await aes.encrypt(new Uint8Array(2)),
        salt,
      };
      commit('resetAccountCount');
      commit('selectIdentity', 0);
      commit('setKeystore', encryptedHdWallet);
      commit('setDerivedKey', passwordDerivedKey);
    },
    async unlockKeystore({ commit, state: { keystore } }, password) {
      const passwordDerivedKey = await derivePasswordKey(password, keystore.salt);
      const aes = new AES(passwordDerivedKey);
      await aes.decrypt(keystore.privateKey);
      await aes.decrypt(keystore.chainCode);
      const mac = new Uint8Array(await aes.decrypt(keystore.mac));
      if (mac.reduce((p, n) => p || n !== 0, false)) throw new Error('Invalid password');
      commit('setDerivedKey', passwordDerivedKey);
    },
    signTransaction(
      {
        state: { accounts }, dispatch, rootState: { epoch: { nodeNetworkId } },
      },
      { transaction, stepIcon },
    ) {
      return dispatch('modals/confirmSpend', {
        ...transaction,
        stepIcon,
      }).then(async (fee) => {
        const binaryTx = await dispatch('genSpendTxBinary', { ...transaction, fee });
        const signature = Crypto.sign(
          Buffer.concat([Buffer.from(nodeNetworkId), binaryTx]),
          accounts[transaction.senderId].secretKey,
        );
        return Crypto.encodeTx(Crypto.prepareTx(signature, binaryTx));
      });
    },
  },
};

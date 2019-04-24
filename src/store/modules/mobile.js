/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */

import Vue from 'vue';
import { times } from 'lodash-es';
import { mnemonicToSeed } from '@aeternity/bip39';
import AES from '../../lib/aes';
import {
  genRandomBuffer, derivePasswordKey, generateHdWallet, getHdWalletAccount,
} from '../utils';

export default {
  state: {
    encryptedHdWallet: null,
    hdWallet: null,
    accountCount: 1,
    accountNames: ['Main Account'],
    accounts: {},
    followers: {},
    showAccountSwitcher: false,
    stepFraction: null,
    browserPath: '',
  },

  getters: {
    addresses: ({ accounts }) => Object.keys(accounts),
    loggedIn: ({ accounts }) => !!Object.keys(accounts).length,
  },

  mutations: {
    setEncryptedHdWallet(state, encryptedHdWallet) {
      state.encryptedHdWallet = encryptedHdWallet;
    },
    setHdWallet(state, hdWallet) {
      state.hdWallet = hdWallet;
      state.accounts = times(state.accountCount, idx => getHdWalletAccount(state.hdWallet, idx))
        .reduce((p, { address, ...account }) => ({ ...p, [address]: account }), {});
    },
    setCurrentAccountName({ accountNames }, name) {
      Vue.set(accountNames, this.state.selectedAccountIdx, name);
    },
    addAccount(state, {
      address, name, active, ...account
    }) {
      Vue.set(state.accounts, address, account);
      state.accountCount += 1;
      if (active) this.state.selectedAccountIdx = state.accountCount - 1;
      state.accountNames.push(name);
    },
    logout(state) {
      state.hdWallet = {};
      state.accounts = {};
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
    setStepFraction(state, stepFraction = null) {
      state.stepFraction = stepFraction;
    },
    setBrowserPath(state, browserPath) {
      state.browserPath = browserPath;
    },
  },

  actions: {
    async discoverAccounts({ state, rootState, commit }) {
      let account;
      do {
        if (account) commit('addAccount', { ...account, name: `Account #${state.accountCount}` });
        account = getHdWalletAccount(state.hdWallet, state.accountCount);
      } while (await rootState.sdk.api // eslint-disable-line no-await-in-loop
        .getAccountByPubkey(account.address).then(() => true, () => false));
    },
    async createHdWallet({ commit, dispatch }, { password, seed }) {
      const salt = genRandomBuffer(16);
      const passwordDerivedKey = await derivePasswordKey(password, salt);
      const aes = new AES(passwordDerivedKey);
      const hdWallet = generateHdWallet(mnemonicToSeed(seed));
      commit('setEncryptedHdWallet', {
        privateKey: await aes.encrypt(hdWallet.privateKey),
        chainCode: await aes.encrypt(hdWallet.chainCode),
        mac: await aes.encrypt(new Uint8Array(2)),
        salt,
      });
      commit('setHdWallet', hdWallet);
      dispatch('discoverAccounts');
    },
    async unlockHdWallet({ state: { encryptedHdWallet }, commit, dispatch }, password) {
      const passwordDerivedKey = await derivePasswordKey(password, encryptedHdWallet.salt);
      const aes = new AES(passwordDerivedKey);
      const hdWallet = {
        privateKey: await aes.decrypt(encryptedHdWallet.privateKey),
        chainCode: await aes.decrypt(encryptedHdWallet.chainCode),
      };
      const mac = new Uint8Array(await aes.decrypt(encryptedHdWallet.mac));
      if (mac.reduce((p, n) => p || n !== 0, false)) throw new Error('Invalid password');
      commit('setHdWallet', hdWallet);
      dispatch('discoverAccounts');
    },
    async createAccount({ state: { hdWallet, accountCount }, commit }, name) {
      commit('addAccount', { ...getHdWalletAccount(hdWallet, accountCount), name, active: true });
    },
  },
};

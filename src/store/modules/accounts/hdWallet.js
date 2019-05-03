/* eslint no-param-reassign: ['error', { 'ignorePropertyModificationsFor': ['state'] }] */

import { pick } from 'lodash-es';
import Vue from 'vue';
import { mnemonicToSeed } from '@aeternity/bip39';
import { Crypto, TxBuilder } from '@aeternity/aepp-sdk/es';
import { OBJECT_ID_TX_TYPE, TX_TYPE } from '@aeternity/aepp-sdk/es/tx/builder/schema';
import BigNumber from 'bignumber.js';
import { MAGNITUDE } from '../../../lib/constants';
import {
  derivePasswordKey, generateHdWallet, genRandomBuffer, getHdWalletAccount,
} from '../../utils';
import AES from '../../../lib/aes';
import { getDesktopRemoveSignAction } from './utils';

export default {
  namespaced: true,

  account: {
    type: 'hd-wallet',
    color: 'primary',
  },

  state: process.env.IS_MOBILE_DEVICE ? {
    encryptedWallet: null,
    wallet: null,
  } : {},

  getters: process.env.IS_MOBILE_DEVICE ? {
    nextIdx: (state, getters, rootState, rootGetters) => Math.max(
      ...rootGetters['accounts/getByType']('hd-wallet').map(({ source: { idx } }) => idx),
      -1,
    ) + 1,
  } : {},

  mutations: process.env.IS_MOBILE_DEVICE ? {
    setEncryptedWallet(state, encryptedWallet) {
      state.encryptedWallet = encryptedWallet;
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
      let account;
      do {
        if (account) {
          commit('accounts/add', { ...account, type: 'hd-wallet' }, { root: true });
        }
        account = getHdWalletAccount(state.wallet, getters.nextIdx);
      } while (await sdk.api // eslint-disable-line no-await-in-loop
        .getAccountByPubkey(account.address).then(() => true, () => false));
    },

    async createWallet({ commit, dispatch }, { password, seed }) {
      const salt = genRandomBuffer(16);
      const passwordDerivedKey = await derivePasswordKey(password, salt);
      const aes = new AES(passwordDerivedKey);
      const wallet = generateHdWallet(mnemonicToSeed(seed));
      commit('setEncryptedWallet', {
        privateKey: await aes.encrypt(wallet.privateKey),
        chainCode: await aes.encrypt(wallet.chainCode),
        mac: await aes.encrypt(new Uint8Array(2)),
        salt,
      });
      commit('setWallet', wallet);
      dispatch('create', 'Main Account');
      dispatch('discover');
    },

    async unlockWallet({ state: { encryptedWallet }, commit, dispatch }, password) {
      const passwordDerivedKey = await derivePasswordKey(password, encryptedWallet.salt);
      const aes = new AES(passwordDerivedKey);
      const wallet = {
        privateKey: await aes.decrypt(encryptedWallet.privateKey),
        chainCode: await aes.decrypt(encryptedWallet.chainCode),
      };
      const mac = new Uint8Array(await aes.decrypt(encryptedWallet.mac));
      if (mac.reduce((p, n) => p || n !== 0, false)) throw new Error('Invalid password');
      commit('setWallet', wallet);
      dispatch('discover');
    },

    async create({ state: { wallet }, getters: { nextIdx }, commit }, name) {
      commit('accounts/add', {
        ...getHdWalletAccount(wallet, nextIdx), name, active: true, type: 'hd-wallet',
      }, { root: true });
    },

    signWithoutConfirmation({ rootGetters }, data) {
      return Crypto.sign(data, rootGetters['accounts/active'].source.secretKey);
    },

    async confirmRawDataSigning({ dispatch }, data) {
      await dispatch('modals/confirmSign', { data }, { root: true });
      return data;
    },

    async confirmTxSigning({ dispatch }, txBinary) {
      let txObject;
      try {
        txObject = TxBuilder.unpackTx(txBinary, true).tx;
      } catch (e) {
        return dispatch('confirmRawDataSigning', txBinary);
      }

      const confirmActionName = {
        [TX_TYPE.spend]: 'modals/confirmSpend',
        [TX_TYPE.contractCreate]: 'modals/confirmContractDeploy',
        [TX_TYPE.contractCall]: 'modals/confirmContractCall',
      }[OBJECT_ID_TX_TYPE[txObject.tag]];
      if (!confirmActionName) return dispatch('confirmRawDataSigning', txBinary);

      const format = value => BigNumber(value).shiftedBy(-MAGNITUDE);
      const confirmProps = {
        ...txObject,
        amount: format(txObject.amount),
        fee: format(txObject.fee),
        minFee: format(TxBuilder.calculateFee(
          0, OBJECT_ID_TX_TYPE[txObject.tag], { gas: txObject.gas, params: txObject },
        )),
      };

      return TxBuilder.buildTx(
        {
          ...txObject,
          fee: (await dispatch(confirmActionName, confirmProps, { root: true }))
            .shiftedBy(MAGNITUDE),
        },
        OBJECT_ID_TX_TYPE[txObject.tag],
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
        Buffer.concat([Buffer.from(sdk.nodeNetworkId), encodedTx]),
      );
      return TxBuilder.buildTx({ encodedTx, signatures: [signature] }, TX_TYPE.signed).tx;
    },
  } : {
    create({ dispatch }, name) {
      return dispatch(
        'remoteConnection/call',
        { name: 'createAccount', args: [name] },
        { root: true },
      );
    },
    sign: getDesktopRemoveSignAction('sign'),
    signTransaction: getDesktopRemoveSignAction('signTransaction'),
  },
};

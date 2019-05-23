/* eslint-disable no-undef */
/* eslint no-param-reassign: ['error', { 'ignorePropertyModificationsFor': ['state'] }] */

import { Crypto } from '@aeternity/aepp-sdk/es';
import { getDesktopRemoveSignAction } from './utils';
import { parseSyncCode, AIR_GAP_PAYLOAD_IDX } from '../../../lib/vaultSyncCodeParser';

const AIR_GAP_VERSION = '1';
const AIR_GAP_TYPE = '0';
const AIR_GAP_PROTOCOL = 'ae';
const AIR_GAP_CALLBACK = 'airgap-wallet://?d=';
const AIR_GAP_SIGNED_TRANSACTION_IDX = 0;
const AIR_GAP_QR_CODE_TRANSPORT = 'qr-code';
const AIR_GAP_DEEP_LINK_TRANSPORT = 'deep-link';

export default {
  namespaced: true,

  account: {
    type: 'air-gap',
    color: 'alternative',
  },

  state: {
    newAccountName: '',
  },

  mutations: {
    setNewAccountName(state, newAccountName) {
      state.newAccountName = newAccountName;
    },
  },

  actions: process.env.IS_MOBILE_DEVICE ? {
    createBySyncCode({ state: { newAccountName }, commit }, {
      syncCode, transport = AIR_GAP_DEEP_LINK_TRANSPORT,
    }) {
      const { publicKey, address } = parseSyncCode(syncCode);
      commit('accounts/add', {
        address,
        name: newAccountName,
        active: true,
        type: 'air-gap',
        transport,
        publicKey,
      }, { root: true });
    },

    async createByQrCode({ dispatch }) {
      const syncCode = await dispatch('modals/open', { title: 'Link Vault', name: 'readQrCode' }, { root: true });
      dispatch('createBySyncCode', { syncCode, transport: AIR_GAP_QR_CODE_TRANSPORT });
    },

    create({ commit, dispatch }, name) {
      commit('setNewAccountName', name);
      dispatch('router/push', { name: 'vault-setup-method' }, { root: true });
    },

    sign: () => Promise.reject(new Error('Not implemented yet')),

    async prepareUnsignedTransaction({ rootState: { sdk }, rootGetters }, transaction) {
      const requestRlp = [
        AIR_GAP_VERSION,
        AIR_GAP_TYPE,
        AIR_GAP_PROTOCOL, [
          [
            sdk.nodeNetworkId,
            transaction,
          ],
          rootGetters['accounts/active'].source.publicKey,
          AIR_GAP_CALLBACK,
        ],
      ];

      const requestUrl = new URL('airgap-vault://');
      requestUrl.searchParams.set('d', Crypto.encodeBase58Check(Crypto.encode(requestRlp)));

      return requestUrl;
    },

    async signTransactionOnThisDevice({ dispatch }, requestUrl) {
      let sApp;

      if (cordova.platformId === 'android') {
        sApp = window.startApp.set({
          action: 'ACTION_VIEW',
          uri: requestUrl,
          flags: ['FLAG_ACTIVITY_NEW_TASK'],
        });
      } else if (cordova.platformId === 'ios') {
        sApp = window.startApp.set(requestUrl);
      }

      sApp.start();

      const encodedSignedTx = await new Promise(resolve => Object.assign(window, {
        handleOpenURL: (url) => {
          resolve(new URL(url).searchParams.get('d'));
        },
      }));

      return dispatch('prepareSignedTransaction', encodedSignedTx);
    },

    async signTransactionOnAnotherDevice({ dispatch }, requestUrl) {
      await dispatch('modals/open', { name: 'vaultSign', url: requestUrl.toString() }, { root: true });
      const encodedSignedTx = await dispatch('readQrCode', { title: 'Scan Signed Transaction' });

      return dispatch('prepareSignedTransaction', encodedSignedTx);
    },

    async prepareSignedTransaction(_, encodedSignedTx) {
      const decodedSignedTx = Crypto.decode(Crypto.decodeBase58Check(encodedSignedTx));

      return decodedSignedTx[AIR_GAP_PAYLOAD_IDX][AIR_GAP_SIGNED_TRANSACTION_IDX].toString();
    },

    async signTransaction({ rootGetters, dispatch }, transaction) {
      const requestUrl = await dispatch('prepareUnsignedTransaction', transaction);
      if (rootGetters['accounts/active'].source.transport === AIR_GAP_DEEP_LINK_TRANSPORT) return dispatch('signTransactionOnThisDevice', requestUrl);

      return dispatch('signTransactionOnAnotherDevice', requestUrl);
    },
  } : {
    sign: getDesktopRemoveSignAction('sign'),
    signTransaction: getDesktopRemoveSignAction('signTransaction'),
  },
};

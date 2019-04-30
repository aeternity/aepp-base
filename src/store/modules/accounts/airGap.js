/* eslint no-param-reassign: ['error', { 'ignorePropertyModificationsFor': ['state'] }] */

import { Crypto } from '@aeternity/aepp-sdk/es';
import { getDesktopRemoveSignAction } from './utils';

const AIR_GAP_VERSION = '1';
const AIR_GAP_TYPE = '0';
const AIR_GAP_PROTOCOL = 'ae';
const AIR_GAP_CALLBACK = 'airgap-wallet://?d=';
const AIR_GAP_PAYLOAD_IDX = 3;
const AIR_GAP_PUBLIC_KEY_IDX = 0;
const AIR_GAP_SIGNED_TRANSACTION_IDX = 0;

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
    async readQrCode({ dispatch }, payload) {
      const response = new URL(await dispatch('modals/readQrCode', payload, { root: true }));
      return response.searchParams.get('d');
    },

    async createByQrCode({ state: { newAccountName }, commit, dispatch }) {
      const encodedAccount = await dispatch('readQrCode', { title: 'Link Vault' });
      const decodedAccount = Crypto.decode(Crypto.decodeBase58Check(encodedAccount));
      const publicKey = decodedAccount[AIR_GAP_PAYLOAD_IDX][AIR_GAP_PUBLIC_KEY_IDX].toString();
      const address = Crypto.aeEncodeKey(publicKey).toString();
      commit('accounts/add', {
        address,
        name: newAccountName,
        active: true,
        type: 'air-gap',
        transport: 'qr-code',
        publicKey,
      }, { root: true });
    },

    create({ commit, dispatch }, name) {
      commit('setNewAccountName', name);
      dispatch('router/push', { name: 'vault-setup-method' }, { root: true });
    },

    sign: () => Promise.reject(new Error('Not implemented yet')),

    async signTransaction({ rootState: { sdk }, rootGetters, dispatch }, transaction) {
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

      await dispatch('modals/vaultSign', { url: requestUrl.toString() }, { root: true });
      const encodedSignedTx = await dispatch('readQrCode', { title: 'Scan Signed Transaction' });
      const decodedSignedTx = Crypto.decode(Crypto.decodeBase58Check(encodedSignedTx));

      return decodedSignedTx[AIR_GAP_PAYLOAD_IDX][AIR_GAP_SIGNED_TRANSACTION_IDX].toString();
    },
  } : {
    sign: getDesktopRemoveSignAction('sign'),
    signTransaction: getDesktopRemoveSignAction('signTransaction'),
  },
};

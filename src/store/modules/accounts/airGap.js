/* eslint no-param-reassign: ['error', { 'ignorePropertyModificationsFor': ['state'] }] */

import { encode, Encoding } from '@aeternity/aepp-sdk-next';
import { getDesktopRemoteSignAction } from './utils';
import {
  getPublicKeyByResponseUrl, getSignedTransactionByResponseUrl, generateSignRequestUrl,
} from '../../../lib/airGap';
import { IS_IOS, IS_PWA } from '../../../lib/constants';
import { i18n } from '../../plugins/ui/languages';
import { receive } from '../../../lib/localStorageCall';

const TRANSPORT_QR_CODE = 'qr-code';
const TRANSPORT_DEEP_LINK = 'deep-link';

export default {
  namespaced: true,

  account: {
    type: 'air-gap',
    getTypeVerbose: () => i18n.t('air-gap.account-name'),
    color: 'alternative',
  },

  state: ENV_MOBILE_DEVICE ? {
    deepLinkCallback: null,
  } : {},

  mutations: ENV_MOBILE_DEVICE ? {
    setDeepLinkCallback(state, callback) {
      state.deepLinkCallback = callback;
    },
  } : {},

  actions: ENV_MOBILE_DEVICE ? {
    createByResponseUrl({ commit }, { responseUrl, transport = TRANSPORT_DEEP_LINK }) {
      const publicKey = getPublicKeyByResponseUrl(responseUrl);
      const address = encode(publicKey, Encoding.AccountAddress);
      commit('accounts/add', {
        address,
        active: true,
        type: 'air-gap',
        transport,
        publicKey,
      }, { root: true });
    },

    async createByQrCode({ dispatch }) {
      const responseUrl = await dispatch(
        'modals/open',
        { title: i18n.t('air-gap.link-vault'), name: 'readQrCode' },
        { root: true },
      );
      dispatch('createByResponseUrl', { responseUrl, transport: TRANSPORT_QR_CODE });
    },

    create({ dispatch }) {
      dispatch('router/push', { name: 'vault-setup-method' }, { root: true });
    },

    sign: () => Promise.reject(new Error('Not implemented yet')),

    signTransactionByDeepLink({ commit }, requestUrl) {
      if (process.env.VUE_APP_CORDOVA) {
        window.startApp.set(
          IS_IOS
            ? requestUrl
            : {
              action: 'ACTION_VIEW',
              uri: requestUrl,
              flags: ['FLAG_ACTIVITY_NEW_TASK'],
            },
        ).start();
      } else {
        window.location.href = requestUrl;
      }
      return process.env.VUE_APP_CORDOVA || IS_PWA
        ? new Promise((resolve) => { commit('setDeepLinkCallback', resolve); }) : receive();
    },

    async signTransactionByQrCode({ dispatch }, { url, signal }) {
      await dispatch('modals/open', { name: 'vaultSign', url, signal }, { root: true });
      return dispatch(
        'modals/open',
        { title: i18n.t('air-gap.scan-signed-transaction'), name: 'readQrCode', signal },
        { root: true },
      );
    },

    async signTransaction({ rootState: { sdk }, rootGetters, dispatch }, { transaction, signal }) {
      const requestUrl = generateSignRequestUrl(
        sdk.getNetworkId(),
        transaction,
        rootGetters['accounts/active'].source.publicKey,
      );
      const responseUrl = rootGetters['accounts/active'].source.transport === TRANSPORT_DEEP_LINK
        ? await dispatch('signTransactionByDeepLink', requestUrl)
        : await dispatch('signTransactionByQrCode', { url: requestUrl, signal });
      return getSignedTransactionByResponseUrl(responseUrl);
    },
  } : {
    sign: getDesktopRemoteSignAction('sign', 'data'),
    signTransaction: getDesktopRemoteSignAction('signTransaction', 'transaction'),
  },
};

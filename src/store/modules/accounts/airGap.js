/* eslint no-param-reassign: ['error', { 'ignorePropertyModificationsFor': ['state'] }] */

import { Crypto } from '@aeternity/aepp-sdk/es';
import { getDesktopRemoveSignAction } from './utils';
import {
  getPublicKeyByResponseUrl, getSignedTransactionByResponseUrl, generateSignRequestUrl,
} from '../../../lib/airGap';
import { i18n } from '../../plugins/ui/languages';

const TRANSPORT_QR_CODE = 'qr-code';
const TRANSPORT_DEEP_LINK = 'deep-link';

export default {
  namespaced: true,

  account: {
    type: 'air-gap',
    getTypeVerbose: () => i18n.t('air-gap.account-name'),
    color: 'alternative',
  },

  actions: process.env.IS_MOBILE_DEVICE ? {
    createByResponseUrl({ commit }, { responseUrl, transport = TRANSPORT_DEEP_LINK }) {
      const publicKey = getPublicKeyByResponseUrl(responseUrl);
      const address = Crypto.aeEncodeKey(publicKey);
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
        { title: 'Link Vault', name: 'readQrCode' },
        { root: true },
      );
      dispatch('createByResponseUrl', { responseUrl, transport: TRANSPORT_QR_CODE });
    },

    create({ dispatch }) {
      dispatch('router/push', { name: 'vault-setup-method' }, { root: true });
    },

    sign: () => Promise.reject(new Error('Not implemented yet')),

    async signTransactionByDeepLink(store, requestUrl) {
      window.startApp.set(
        process.env.IS_IOS
          ? requestUrl
          : {
            action: 'ACTION_VIEW',
            uri: requestUrl,
            flags: ['FLAG_ACTIVITY_NEW_TASK'],
          },
      ).start();

      return new Promise((resolve) => {
        window.handleOpenURL = url => resolve(url);
      });
    },

    async signTransactionByQrCode({ dispatch }, url) {
      await dispatch('modals/open', { name: 'vaultSign', url }, { root: true });
      return dispatch(
        'modals/open',
        { title: i18n.t('air-gap.scan-signed-transaction'), name: 'readQrCode' },
        { root: true },
      );
    },

    async signTransaction({ rootState: { sdk }, rootGetters, dispatch }, transaction) {
      const requestUrl = generateSignRequestUrl(
        sdk.getNetworkId(),
        transaction,
        rootGetters['accounts/active'].source.publicKey,
      );

      return getSignedTransactionByResponseUrl(await dispatch(
        rootGetters['accounts/active'].source.transport === TRANSPORT_DEEP_LINK
          ? 'signTransactionByDeepLink'
          : 'signTransactionByQrCode',
        requestUrl,
      ));
    },
  } : {
    sign: getDesktopRemoveSignAction('sign'),
    signTransaction: getDesktopRemoveSignAction('signTransaction'),
  },
};

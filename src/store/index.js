/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */

import Vue from 'vue';
import Vuex from 'vuex';
import { makeResetable } from './utils';
import rootModule from './modules/root';
import desktopModule from './modules/desktop';
import mobileModule from './modules/mobile';
import persistState from './plugins/persistState';
import ledgerConnection from './plugins/ledgerConnection';
import remoteConnection from './plugins/remoteConnection';
import notificationOnRemoteConnection from './plugins/notificationOnRemoteConnection';
import decryptAccounts from './plugins/decryptAccounts';
import initSdk from './plugins/initSdk';
import modals from './plugins/modals';
import registerServiceWorker from './plugins/registerServiceWorker';
import browserPathTracker from './plugins/browserPathTracker';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    persistState(
      ({ mobile: { names, ...otherMobile } = {}, ...otherState }) => ({
        ...otherState,
        mobile: {
          ...otherMobile,
          accountNames: names,
        },
      }),
      ({
        migrations, rpcUrl, selectedIdentityIdx, addressBook, customNetworks,
        apps, cachedAppManifests,
        mobile, desktop,
      }) => ({
        migrations,
        ...process.env.IS_MOBILE_DEVICE ? {
          rpcUrl,
          selectedIdentityIdx,
          addressBook,
          customNetworks,
          apps,
          cachedAppManifests,
          mobile: {
            keystore: mobile.keystore,
            accountCount: mobile.accountCount,
            names: mobile.accountNames,
            followers: Object.entries(mobile.followers)
              .reduce((p, [k, { id, name, disconnectedAt }]) => (
                { ...p, [k]: { id, name, disconnectedAt } }), {}),
          },
        } : {
          desktop: {
            peerId: desktop.peerId,
            ledgerAccountNumber: desktop.ledgerAccountNumber,
          },
        },
      }),
    ),
    initSdk,
    remoteConnection,
    modals,
    registerServiceWorker,
    ...process.env.IS_MOBILE_DEVICE
      ? [decryptAccounts, notificationOnRemoteConnection, browserPathTracker] : [ledgerConnection],
  ],

  modules: process.env.IS_MOBILE_DEVICE
    ? { mobile: makeResetable(mobileModule) }
    : { desktop: makeResetable(desktopModule) },

  ...makeResetable(rootModule),
});

export default store;

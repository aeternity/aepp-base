/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */

import Vue from 'vue';
import Vuex from 'vuex';
import VueRx from 'vue-rx';
import { makeResetable } from './utils';
import rootModule from './modules/root';
import desktopModule from './modules/desktop';
import mobileModule from './modules/mobile';
import persistState from './plugins/persistState';
import ledgerConnection from './plugins/ledgerConnection';
import remoteConnection from './plugins/remoteConnection';
import notificationOnRemoteConnection from './plugins/notificationOnRemoteConnection';
import initSdk from './plugins/initSdk';
import modals from './plugins/modals';
import registerServiceWorker from './plugins/registerServiceWorker';
import browserPathTracker from './plugins/browserPathTracker';
import observables from './plugins/observables';

Vue.use(Vuex);
Vue.use(VueRx);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    persistState(
      ({ mobile: { keystore, names, ...otherMobile } = {}, ...otherState }) => ({
        ...otherState,
        mobile: {
          ...otherMobile,
          encryptedHdWallet: keystore,
          accountNames: names,
        },
      }),
      ({
        migrations, rpcUrl, selectedIdentityIdx, addressBook, customNetworks,
        apps, cachedAppManifests, peerId,
        mobile, desktop,
      }) => ({
        migrations,
        peerId,
        ...process.env.IS_MOBILE_DEVICE ? {
          rpcUrl,
          selectedIdentityIdx,
          addressBook,
          customNetworks,
          apps,
          cachedAppManifests,
          mobile: {
            keystore: mobile.encryptedHdWallet,
            accountCount: mobile.accountCount,
            names: mobile.accountNames,
            followers: Object.entries(mobile.followers)
              .reduce((p, [k, { id, name, disconnectedAt }]) => (
                { ...p, [k]: { id, name, disconnectedAt } }), {}),
          },
        } : {
          desktop: {
            ledgerAccountNumber: desktop.ledgerAccountNumber,
          },
        },
      }),
    ),
    initSdk,
    remoteConnection,
    modals,
    registerServiceWorker,
    observables,
    ...process.env.IS_MOBILE_DEVICE
      ? [notificationOnRemoteConnection, browserPathTracker] : [ledgerConnection],
  ],

  modules: process.env.IS_MOBILE_DEVICE
    ? { mobile: makeResetable(mobileModule) }
    : { desktop: makeResetable(desktopModule) },

  ...makeResetable(rootModule),
});

export default store;

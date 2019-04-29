/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */

import { pick } from 'lodash-es';
import Vue from 'vue';
import Vuex from 'vuex';
import VueRx from 'vue-rx';
import { makeResetable } from './utils';
import rootModule from './modules/root';
import desktopModule from './modules/desktop';
import mobileModule from './modules/mobile';
import accountsModule from './modules/accounts';
import persistState from './plugins/persistState';
import ledgerConnection from './plugins/ledgerConnection';
import remoteConnection from './plugins/remoteConnection';
import notificationOnRemoteConnection from './plugins/notificationOnRemoteConnection';
import initSdk from './plugins/initSdk';
import modals from './plugins/modals';
import registerServiceWorker from './plugins/registerServiceWorker';
import browserPathTracker from './plugins/browserPathTracker';
import observables from './plugins/observables';
import reverseIframe from './plugins/reverseIframe';
import syncLedgerAccounts from './plugins/syncLedgerAccounts';

Vue.use(Vuex);
Vue.use(VueRx);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    persistState(
      state => state,
      ({
        migrations, sdkUrl, addressBook, customNetworks,
        apps, cachedAppManifests, peerId,
        accounts: { list, activeIdx, hdWallet: { encryptedWallet } = {} } = {},
        mobile: { followers } = {},
      }) => ({
        migrations,
        peerId,
        sdkUrl,
        addressBook,
        customNetworks,
        accounts: {
          list: list.map(({ name, address, source }) => {
            switch (source.type) {
              case 'hd-wallet':
                return {
                  name,
                  address,
                  transactions: [],
                  source: pick(source, ['type', 'idx']),
                };
              default:
                return { name, address, source };
            }
          }),
          activeIdx,
          hdWallet: { encryptedWallet },
        },
        ...process.env.IS_MOBILE_DEVICE && {
          apps,
          cachedAppManifests,
          mobile: {
            followers: Object.entries(followers)
              .reduce((p, [k, { id, name, disconnectedAt }]) => (
                { ...p, [k]: { id, name, disconnectedAt } }), {}),
          },
        },
      }),
    ),
    initSdk,
    remoteConnection,
    modals,
    registerServiceWorker,
    observables,
    reverseIframe,
    ...process.env.IS_MOBILE_DEVICE
      ? [notificationOnRemoteConnection, browserPathTracker]
      : [ledgerConnection, syncLedgerAccounts],
  ],

  modules: {
    ...process.env.IS_MOBILE_DEVICE
      ? { mobile: makeResetable(mobileModule) }
      : { desktop: makeResetable(desktopModule) },
    accounts: makeResetable(accountsModule),
  },

  ...makeResetable(rootModule),
});

export default store;

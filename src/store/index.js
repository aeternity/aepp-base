/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */

import { pick } from 'lodash-es';
import Vue from 'vue';
import Vuex from 'vuex';
import VueRx from 'vue-rx';
import '../lib/storeErrorHandler';
import rootModule from './modules/root';
import desktopModule from './modules/desktop';
import mobileModule from './modules/mobile';
import accountsModule from './modules/accounts';
import runMigrations from './migrations';
import persistState from './plugins/persistState';
import remoteConnection from './plugins/remoteConnection';
import initSdk from './plugins/initSdk';
import registerServiceWorker from './plugins/registerServiceWorker';
import reverseIframe from './plugins/reverseIframe';
import syncLedgerAccounts from './plugins/syncLedgerAccounts';
import unlockWalletIfNotEncrypted from './plugins/unlockWalletIfNotEncrypted';

Vue.use(Vuex);
Vue.use(VueRx);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    persistState(
      (state, store) => runMigrations(state, store),
      ({
        migrations, sdkUrl, customNetworks,
        apps, peerId, languages, currencies, names: { defaults } = {},
        accounts: { list, activeIdx, hdWallet: { encryptedWallet, mnemonicBackedUp } = {} } = {},
        mobile: { readSecurityCourses, followers, skipAddingToHomeScreen } = {},
        desktop: { showGuideOnStartup } = {},
      }) => ({
        migrations,
        peerId,
        languages,
        currencies,
        sdkUrl,
        names: { defaults },
        customNetworks,
        accounts: {
          list: list.map(({ address, source }) => {
            switch (source.type) {
              case 'hd-wallet':
                return {
                  address,
                  source: pick(source, ['type', 'idx']),
                };
              default:
                return { address, source };
            }
          }),
          activeIdx,
          hdWallet: { encryptedWallet, mnemonicBackedUp },
        },
        apps,
        ...process.env.IS_MOBILE_DEVICE ? {
          mobile: {
            readSecurityCourses,
            followers: Object.entries(followers)
              .reduce((p, [k, { id, name, disconnectedAt }]) => (
                { ...p, [k]: { id, name, disconnectedAt } }), {}),
            skipAddingToHomeScreen,
          },
        } : {
          desktop: { showGuideOnStartup },
        },
      }),
    ),
    initSdk,
    ...process.env.RUNNING_IN_POPUP ? [] : [
      remoteConnection,
      registerServiceWorker,
      reverseIframe,
      ...process.env.IS_MOBILE_DEVICE ? [] : [syncLedgerAccounts],
      ...process.env.RUNNING_IN_FRAME ? [unlockWalletIfNotEncrypted] : [],
    ],
  ],

  modules: {
    ...process.env.RUNNING_IN_POPUP ? {} : {
      ...process.env.IS_MOBILE_DEVICE
        ? { mobile: mobileModule }
        : { desktop: desktopModule },
    },
    accounts: accountsModule,
  },

  ...rootModule,
});

/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */

import { pick } from 'lodash-es';
import Vue from 'vue';
import Vuex from 'vuex';
import VueRx from 'vue-rx';
import '../lib/storeErrorHandler';
import { RUNNING_IN_POPUP, RUNNING_IN_FRAME } from '../lib/constants';
import rootModule from './modules/root';
import desktopModule from './modules/desktop';
import mobileModule from './modules/mobile';
import accountsModule from './modules/accounts';
import runMigrations from './migrations';
import persistState from './plugins/persistState';
import remoteConnection from './plugins/remoteConnection';
import initSdk from './plugins/initSdk';
import sdk from './plugins/sdk';
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
        migrations,
        sdkUrl,
        customNetworks,
        apps,
        peerId,
        languages,
        currencies,
        names: { defaults } = {},
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
        ...(ENV_MOBILE_DEVICE
          ? {
              mobile: {
                readSecurityCourses,
                followers: Object.fromEntries(
                  Object.entries(followers)
                    // this is needed to remove extra fields
                    .map(([k, { id, name, disconnectedAt }]) => [k, { id, name, disconnectedAt }]),
                ),
                skipAddingToHomeScreen,
              },
            }
          : {
              desktop: { showGuideOnStartup },
            }),
      }),
    ),
    initSdk,
    sdk,
    ...(RUNNING_IN_POPUP
      ? []
      : [
          remoteConnection,
          registerServiceWorker,
          reverseIframe,
          ...(ENV_MOBILE_DEVICE ? [] : [syncLedgerAccounts]),
          ...(RUNNING_IN_FRAME ? [unlockWalletIfNotEncrypted] : []),
        ]),
  ],

  modules: {
    ...(RUNNING_IN_POPUP
      ? {}
      : {
          ...(ENV_MOBILE_DEVICE ? { mobile: mobileModule } : { desktop: desktopModule }),
        }),
    accounts: accountsModule,
  },

  ...rootModule,
});

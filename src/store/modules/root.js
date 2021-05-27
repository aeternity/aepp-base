/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */

import Vue from 'vue';
import { update, mergeWith } from 'lodash-es';
import networksRegistry, { defaultNetwork } from '../../lib/networksRegistry';
import { genRandomBuffer } from '../utils';

const getAppByHost = (apps, appHost) => apps.find(({ host }) => host === appHost);

export default {
  state: {
    migrations: {},
    loginTarget: '',
    sdkUrl: networksRegistry[0].url,
    sdk: null,
    serviceWorkerRegistration: null,
    customNetworks: [],
    apps: [],
    peerId: Buffer.from(genRandomBuffer(15)).toString('base64'),
    onLine: true,
    nameListRouteParams: null,
  },

  getters: {
    networks: ({ customNetworks }) => [
      ...networksRegistry,
      ...customNetworks.map(network => ({ ...defaultNetwork, ...network, custom: true })),
    ],
    currentNetwork: ({ sdkUrl }, { networks }) => networks.find(({ url }) => url === sdkUrl) || {
      ...defaultNetwork,
      name: sdkUrl,
      url: sdkUrl,
    },
    getApp: ({ apps }) => getAppByHost.bind(null, apps),
  },

  mutations: {
    syncState(state, remoteState) {
      const customizer = (objValue, srcValue) => {
        if (!Array.isArray(srcValue)) return undefined;
        if (!Array.isArray(objValue)) return srcValue;
        return srcValue.map((el, idx) => (
          el && typeof el === 'object' ? mergeWith({}, objValue[idx], el, customizer) : el
        ));
      };
      Object.entries(mergeWith({}, state, remoteState, customizer))
        .forEach(([name, value]) => Vue.set(state, name, value));
    },
    markMigrationAsApplied(state, migrationId) {
      Vue.set(state.migrations, migrationId, true);
    },
    setLoginTarget(state, loginTarget) {
      state.loginTarget = loginTarget;
    },
    setSdkUrl(state, sdkUrl) {
      state.sdkUrl = sdkUrl;
    },
    setSdk(state, sdk) {
      state.sdk = sdk;
    },
    addNetwork(state, network) {
      state.customNetworks.push(network);
    },
    removeNetwork(state, networkIdx) {
      state.customNetworks.splice(networkIdx - networksRegistry.length, 1);
    },
    toggleAccessToAccount({ apps }, { appHost, accountAddress }) {
      if (!getAppByHost(apps, appHost)) apps.push({ host: appHost });
      const app = getAppByHost(apps, appHost);
      update(
        app,
        'permissions.accessToAccounts',
        (arr = []) => (arr.includes(accountAddress)
          ? arr.filter(address => address !== accountAddress)
          : [...arr, accountAddress]),
      );
    },
    setServiceWorkerRegistration(state, serviceWorkerRegistration) {
      state.serviceWorkerRegistration = serviceWorkerRegistration;
    },
    setOnLine(state, onLine) {
      state.onLine = onLine;
    },
    setSdkAccounts({ sdk }, list) {
      sdk.accounts = list.reduce((p, { address }) => ({ ...p, [address]: {} }), {});
    },
    selectSdkAccount({ sdk }, address) {
      sdk.selectAccount(address);
    },
    setNameListRoute(state, nameListRouteParams) {
      state.nameListRouteParams = nameListRouteParams;
    },
  },
};

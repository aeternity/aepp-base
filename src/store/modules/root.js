import Vue from 'vue';
import { mergeWith } from 'lodash-es';
import networksRegistry from '../../lib/networksRegistry';
import { genRandomBuffer } from '../utils';

const getAppDefaults = () => ({
  bookmarked: false,
  permissions: { accessToAccounts: [] },
});
const getAppByHost = (apps, appHost) => apps.find(({ host }) => host === appHost);

export default {
  state: {
    migrations: {},
    loginTarget: '',
    sdkUrl: networksRegistry[0].url,
    customNetworks: [],
    apps: [],
    peerId: Buffer.from(genRandomBuffer(15)).toString('base64'),
    onLine: true,
    nameListRouteParams: null,
  },

  getters: {
    networks: ({ customNetworks }) => [
      ...networksRegistry,
      ...customNetworks.map((network) => ({ ...networksRegistry[0], ...network, custom: true })),
    ],
    currentNetwork: ({ sdkUrl }, { networks }) =>
      networks.find(({ url }) => url === sdkUrl) || {
        ...networksRegistry[0],
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
        return srcValue.map((el, idx) =>
          el && typeof el === 'object' ? mergeWith({}, objValue[idx], el, customizer) : el,
        );
      };
      Object.entries(mergeWith({}, state, remoteState, customizer)).forEach(([name, value]) =>
        Vue.set(state, name, value),
      );
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
    toggleAppBookmarking({ apps }, appHost) {
      if (!getAppByHost(apps, appHost)) apps.push({ ...getAppDefaults(), host: appHost });
      const app = getAppByHost(apps, appHost);
      app.bookmarked = !app.bookmarked;
    },
    toggleAccessToAccount({ apps }, { appHost, accountAddress }) {
      if (!getAppByHost(apps, appHost)) apps.push({ ...getAppDefaults(), host: appHost });
      const {
        permissions: { accessToAccounts },
      } = getAppByHost(apps, appHost);
      const idx = accessToAccounts.indexOf(accountAddress);
      if (idx === -1) accessToAccounts.push(accountAddress);
      else accessToAccounts.splice(idx, 1);
    },
    setOnLine(state, onLine) {
      state.onLine = onLine;
    },
    setNameListRoute(state, nameListRouteParams) {
      state.nameListRouteParams = nameListRouteParams;
    },
  },
};

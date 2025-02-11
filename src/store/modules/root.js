/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */

import Vue from 'vue';
import { mergeWith, isPlainObject, camelCase } from 'lodash-es';
import { Node, _Middleware } from '@aeternity/aepp-sdk-next';
import networksRegistry from '../../lib/networksRegistry';
import { genRandomBuffer } from '../utils';

class Middleware extends _Middleware {
  async sendOperationRequest(args, spec) {
    // TODO: remove after fixing https://github.com/aeternity/aepp-sdk-js/issues/1986
    if (args.options?.limit) this.limit = args.options?.limit;
    const res = await super.sendOperationRequest(
      args,
      args.options?.overridePath ? { ...spec, path: args.options.overridePath } : spec,
    );
    delete this.limit;

    // TODO: remove after fixing https://github.com/aeternity/aepp-sdk-js/issues/1985
    function mapKeysDeep(object, handler) {
      if (Array.isArray(object)) return object.map((el) => mapKeysDeep(el, handler));
      if (isPlainObject(object)) {
        const entries = Object.entries(object)
          .map(([key, value]) => [handler(key), mapKeysDeep(value, handler)]);
        return Object.fromEntries(entries);
      }
      return object;
    }
    return mapKeysDeep(res, camelCase);
  }
}

const getAppByHost = (apps, appHost) => apps.find(({ host }) => host === appHost);

export default {
  state: {
    migrations: {},
    loginTarget: '',
    sdkUrl: networksRegistry[0].url,
    sdk: null,
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
    currentNetwork: ({ sdkUrl }, { networks }) => networks.find(({ url }) => url === sdkUrl) || {
      ...networksRegistry[0],
      name: sdkUrl,
      url: sdkUrl,
    },
    getApp: ({ apps }) => getAppByHost.bind(null, apps),
    node: (_, { currentNetwork }) => new Node(currentNetwork.url),
    middleware: (_, { currentNetwork }) => new Middleware(currentNetwork.middlewareUrl),
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
      if (!getAppByHost(apps, appHost)) {
        apps.push({ host: appHost, permissions: { accessToAccounts: [] } });
      }
      const { permissions: { accessToAccounts } } = getAppByHost(apps, appHost);
      const idx = accessToAccounts.indexOf(accountAddress);
      if (idx === -1) accessToAccounts.push(accountAddress);
      else accessToAccounts.splice(idx, 1);
    },
    setOnLine(state, onLine) {
      state.onLine = onLine;
    },
    setSdkAccounts({ sdk }, list) {
      sdk.accounts = Object.fromEntries(list.map(({ address }) => [address, {}]));
    },
    selectSdkAccount({ sdk }, address) {
      sdk.selectAccount(address);
    },
    setNameListRoute(state, nameListRouteParams) {
      state.nameListRouteParams = nameListRouteParams;
    },
  },
};

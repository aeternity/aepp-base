import { isPlainObject, camelCase } from 'lodash-es';
import { Node, Middleware as MiddlewareOriginal, AeSdkMethods, AccountBase } from '@aeternity/aepp-sdk-next';

class Middleware extends MiddlewareOriginal {
  async sendOperationRequest(args, spec) {
    // TODO: remove after fixing https://github.com/aeternity/aepp-sdk-js/issues/1986
    if (args.options?.limit) this.limit = args.options?.limit;
    const res = await super.sendOperationRequest(args, spec);
    delete this.limit;

    // TODO: remove after fixing https://github.com/aeternity/aepp-sdk-js/issues/1985
    function mapKeysDeep(object, handler) {
      if (Array.isArray(object)) return object.map((el) => mapKeysDeep(el, handler));
      if (isPlainObject(object)) {
        const entries = Object.entries(object).map(([key, value]) => [
          handler(key),
          mapKeysDeep(value, handler),
        ]);
        return Object.fromEntries(entries);
      }
      if (object?.data && object?.next && object?.prev) {
        object.data = mapKeysDeep(object.data, handler);
        return object;
      }
      return object;
    }
    return mapKeysDeep(res, camelCase);
  }
}

class AccountStore extends AccountBase {
  #store;

  constructor(address, store) {
    super();
    this.address = address;
    this.#store = store;
  }

  sign(data, { signal } = {}) {
    return this.#store.dispatch('accounts/sign', { data, signal });
  }

  signTransaction(transaction, { signal } = {}) {
    return this.#store.dispatch('accounts/signTransaction', { transaction, signal });
  }
}

export default (store) => {
  store.registerModule('sdkSync', {
    state: {
      networkId: '',
    },
    getters: {
      node: (_, { currentNetwork }) => new Node(currentNetwork.url),
      middleware: (_, { currentNetwork }) => new Middleware(currentNetwork.middlewareUrl),
      account: (_, getters) => new AccountStore(getters['accounts/active']?.address, store),
      sdk: (_, { node, account }) => new AeSdkMethods({ onNode: node, onAccount: account, }),
    },
    mutations: {
      setNetworkId(state, networkId) {
        state.networkId = networkId;
      },
    }
  });

  store.watch(
    (_state, { node }) => node,
    async (node) => {
      store.commit('setNetworkId', '_connecting');
      store.commit('setNetworkId', await node.getNetworkId().catch(() => '_cant-connect'));
    },
    { immediate: true },
  );
};

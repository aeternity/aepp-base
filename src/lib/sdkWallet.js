import {
  MemoryAccount,
  AeSdkWallet,
  Node,
  BrowserWindowMessageConnection,
  WALLET_TYPE,
  RpcRejectedByUserError,
  RpcNoNetworkById,
  RpcNotAuthorizeError,
  encode,
  Encoding,
  SUBSCRIPTION_TYPES,
} from '@aeternity/aepp-sdk-next';

function isRejectedByUserError(error) {
  return ['Rejected by user', 'Cancelled by user'].includes(error.message);
}

class AccountStore extends MemoryAccount {
  #store;

  constructor(address, store) {
    super(encode(Buffer.alloc(32), Encoding.AccountSecretKey));
    this.address = address;
    this.#store = store;
  }

  async #switchAccount() {
    const initialAccountIdx = this.#store.state.accounts.activeIdx;
    const requiredAccountIdx = this.#store.state.accounts.list.findIndex(
      ({ address }) => address === this.address,
    );
    await this.#store.dispatch('accounts/setActiveIdx', requiredAccountIdx);
    return () => this.#store.dispatch('accounts/setActiveIdx', initialAccountIdx);
  }

  async sign(data, { signal } = {}) {
    const restore = await this.#switchAccount();
    try {
      return await this.#store.dispatch('accounts/sign', { data, signal });
    } catch (error) {
      if (isRejectedByUserError(error)) throw new RpcRejectedByUserError();
      throw error;
    } finally {
      await restore();
    }
  }

  async signTransaction(transaction, { signal } = {}) {
    const restore = await this.#switchAccount();
    try {
      return await this.#store.dispatch('accounts/signTransaction', { transaction, signal });
    } catch (error) {
      if (isRejectedByUserError(error)) throw new RpcRejectedByUserError();
      throw error;
    } finally {
      await restore();
    }
  }
}

function setupNodeWatch(store, sdk) {
  return store.watch(
    (_state, { node }) => node,
    (node) => {
      sdk.pool = new Map([['node', node]]);
      sdk.selectNode('node');
    },
    { immediate: true },
  );
}

function setupAccountsWatch(store, sdk, host, aeppId) {
  const getAccessibleAddresses = () =>
    store.getters.getApp(host)?.permissions.accessToAccounts ?? [];
  const getCurrentAddress = () => store.getters['accounts/active'].address;

  const unwatchAppAddresses = store.watch(
    () => getAccessibleAddresses(),
    (addresses) => {
      sdk.accounts = Object.fromEntries(
        addresses.map((address) => [address, new AccountStore(address, store)]),
      );
      if (addresses.length) {
        const address = getCurrentAddress();
        sdk.selectAccount(sdk.accounts[address] ? address : addresses[0]);
      } else sdk._pushAccountsToApps();
    },
    { immediate: true },
  );

  let accountAccessPromise;
  function ensureCurrentAccountAccess() {
    async function ensureCurrentAccountAccessPure() {
      if (getAccessibleAddresses().includes(getCurrentAddress())) return;

      const controller = new AbortController();
      const unsubscribe = store.watch(
        () => [getCurrentAddress(), getAccessibleAddresses()],
        ([address, allowed]) => allowed.includes(address) && controller.abort(),
      );
      try {
        await store.dispatch('modals/open', {
          name: 'confirmAccountAccess',
          signal: controller.signal,
          appHost: host,
        });
      } catch (error) {
        if (error.message === 'Modal aborted') return;
        throw error;
      } finally {
        unsubscribe();
      }

      const accountAddress = getCurrentAddress();
      if (!getAccessibleAddresses().includes(accountAddress)) {
        store.commit('toggleAccessToAccount', { appHost: host, accountAddress });
      }
    }

    accountAccessPromise ??= ensureCurrentAccountAccessPure().finally(() => {
      accountAccessPromise = null;
    });
    return accountAccessPromise;
  }

  const unwatchCurrentAddress = store.watch(
    () => getCurrentAddress(),
    async (address) => {
      if (getAccessibleAddresses().includes(address)) {
        sdk.selectAccount(address);
        return;
      }
      const client = sdk._getClient(aeppId);
      if (client.addressSubscription.size === 0) return;
      ensureCurrentAccountAccess();
    },
    { immediate: true },
  );

  return [
    ensureCurrentAccountAccess,
    () => [unwatchAppAddresses, unwatchCurrentAddress].forEach((unwatch) => unwatch()),
  ];
}

function setupConnection(target, sdk) {
  const connection = new BrowserWindowMessageConnection({ target });
  const aeppId = sdk.addRpcClient(connection);
  sdk.shareWalletInfo(aeppId);
  const intervalId = setInterval(() => sdk.shareWalletInfo(aeppId), 3000);
  return [
    aeppId,
    () => {
      clearInterval(intervalId);
      if (sdk._clients.has(aeppId)) sdk.removeRpcClient(aeppId);
    },
  ];
}

export default (store, target, host) => {
  let aeppInfo;
  let authAeppId;
  let ensureCurrentAccountAccess;
  let unbindConnection;
  let unbindAccounts;

  function ensureAuthorized(aeppId, origin) {
    const originHost = new URL(origin).host;
    host ??= originHost;
    if (originHost === host && aeppId === authAeppId) return;
    throw new RpcNotAuthorizeError();
  }

  function confirmAction(action) {
    const res = confirm(`Aepp "${aeppInfo.name}" at ${origin} is requesting ${action}`);
    if (res === false) throw new RpcRejectedByUserError();
  }

  const sdk = new AeSdkWallet({
    id: window.origin,
    type: WALLET_TYPE.window,
    name: 'Base Aepp',
    onConnection: (aeppId, params, origin) => {
      ensureAuthorized(aeppId, origin);
      aeppInfo = params;
      [ensureCurrentAccountAccess, unbindAccounts] = setupAccountsWatch(store, sdk, host, aeppId);
    },
    onSubscription: (aeppId, params, origin) => {
      ensureAuthorized(aeppId, origin);
      if (params.type === SUBSCRIPTION_TYPES.subscribe) void ensureCurrentAccountAccess();
    },
    onAskAccounts: async (aeppId, _params, origin) => {
      ensureAuthorized(aeppId, origin);
      try {
        await ensureCurrentAccountAccess();
      } catch (error) {
        if (isRejectedByUserError(error)) throw new RpcRejectedByUserError();
        throw error;
      }
    },
    onAskToSelectNetwork: async (aeppId, parameters, origin) => {
      ensureAuthorized(aeppId, origin);

      function switchToNetwork({ name, url, networkId }) {
        const details = [url, networkId].filter(Boolean).join(', ');
        confirmAction(`a network switch to ${name} (${details})`);
        store.commit('setSdkUrl', url);
      }

      if (parameters.networkId) {
        const network = (
          await Promise.allSettled(
            store.getters.networks.map(async (network) => ({
              ...network,
              networkId: await new Node(network.url, { retryCount: 0 }).getNetworkId(),
            })),
          )
        )
          .filter(({ status }) => status === 'fulfilled')
          .map(({ value }) => value)
          .find(({ networkId }) => networkId === parameters.networkId);
        if (network == null) throw new RpcNoNetworkById(parameters.networkId);
        switchToNetwork(network);
        return;
      }

      const network = store.getters.networks.find(
        ({ url }) => new URL(url).toString() === new URL(parameters.nodeUrl).toString(),
      );
      if (network) {
        switchToNetwork(network);
        return;
      }

      const networkId = await new Node(parameters.nodeUrl, { retryCount: 0 }).getNetworkId();
      confirmAction(`a network switch to ${parameters.nodeUrl} (${networkId})`);
      store.commit('addNetwork', {
        name: `By ${host}`,
        url: parameters.nodeUrl,
      });
      store.commit('setSdkUrl', parameters.nodeUrl);
    },
    onDisconnect: (aeppId, params) => {
      unbindConnection();
      unbindAccounts();
      [authAeppId, unbindConnection] = setupConnection(target, sdk);
    },
  });

  const unbindNodeWatch = setupNodeWatch(store, sdk);

  [authAeppId, unbindConnection] = setupConnection(target, sdk);

  return () => {
    unbindConnection();
    unbindAccounts?.();
    unbindNodeWatch();
  };
};

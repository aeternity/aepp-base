import { get, isEqual } from 'lodash-es';
import { handleUnknownError } from '../../lib/utils';

export default (store) => {
  const createSdk = async (network) => {
    const [{
      Ae, ChainNode, Transaction, Contract, Aens, Node,
    }, {
      default: WalletRPC,
    }] = (await Promise.all([
      import(/* webpackChunkName: "sdk" */ '@aeternity/aepp-sdk'),
      import(/* webpackChunkName: "sdk" */ '@aeternity/aepp-sdk/es/utils/aepp-wallet-communication/rpc/wallet-rpc'),
    ]));

    class App {
      constructor(host) {
        this.host = host;
      }

      async ensureCurrentAccountAccessPure() {
        const accessToAccounts = get(store.getters.getApp(this.host), 'permissions.accessToAccounts', []);
        if (accessToAccounts.includes(store.getters['accounts/active'].address)) return;
        const promise = store.dispatch(
          'modals/open',
          { name: 'confirmAccountAccess', appHost: this.host },
        );
        const unsubscribe = store.watch(
          (state, getters) => getters['accounts/active'].address,
          (address) => accessToAccounts.includes(address) && promise.cancel(),
        );

        try {
          await Promise.race([
            promise,
            new Promise((resolve, reject) => {
              promise.finally(() => {
                if (!promise.isCancelled()) return;
                if (accessToAccounts.includes(store.getters['accounts/active'].address)) {
                  resolve();
                } else reject(new Error('Unexpected state'));
              });
            }),
          ]);
        } finally {
          unsubscribe();
        }

        const { address: accountAddress } = store.getters['accounts/active'];
        if (!accessToAccounts.includes(accountAddress)) {
          store.commit('toggleAccessToAccount', { appHost: this.host, accountAddress });
        }
      }

      ensureCurrentAccountAccess() {
        if (!this.accountAccessPromise) {
          this.accountAccessPromise = this.ensureCurrentAccountAccessPure();
          this.accountAccessPromise.finally(() => {
            delete this.accountAccessPromise;
          });
        }
        return this.accountAccessPromise;
      }
    }

    const apps = {};

    const methods = {
      getApp(host) {
        if (!apps[host]) apps[host] = new App(host);
        return apps[host];
      },
      async address(...args) {
        if (args[args.length - 1] instanceof App) {
          await args[args.length - 1].ensureCurrentAccountAccess();
        }
        return store.getters['accounts/active'].address;
      },
      sign: (data) => store.dispatch('accounts/sign', data),
      signTransaction: (txBase64) => store.dispatch('accounts/signTransaction', txBase64),
    };

    const acceptCb = (_, { accept }) => accept();
    const sdk = await Ae.compose(ChainNode, Transaction, Contract, Aens, WalletRPC, { methods })({
      nodes: [{
        name: network.name,
        instance: await Node({ url: network.url, ignoreVersion: true }),
      }],
      name: 'Base Aepp',
      onConnection: acceptCb,
      async onSubscription(_, { accept }, origin) {
        const activeAccount = await this.address(this.getApp(origin));
        accept({
          accounts: {
            current: { [activeAccount]: {} },
            connected: Object.fromEntries(
              store.state.accounts.list
                .filter(({ address }) => address !== activeAccount)
                .map(({ address }) => [address, {}]),
            ),
          },
        });
      },
      async onSign(_, { accept }) {
        accept(null, {
          onAccount: { sign: () => {}, address: () => {} },
        });
      },
      onMessageSign: acceptCb,
      onAskAccounts: acceptCb,
      onDisconnect() {
        Object.keys(this.rpcClients).forEach((id) => this.removeRpcClient(id));
      },
    });
    // TODO: remove after updating sdk
    sdk.Ae.defaults.verify = false;

    // backported fix https://github.com/aeternity/aepp-sdk-js/pull/1980
    const { getWalletInfo } = sdk;
    sdk.getWalletInfo = () => {
      const { origin, ...info } = getWalletInfo.call(sdk);
      return {
        ...info,
        origin: 'file://' === info.origin ? '*' : info.origin,
      };
    }

    sdk.selectNode(network.name);
    return sdk;
  };

  const recreateSdk = async () => {
    const { currentNetwork } = store.getters;
    if (store.state.sdk && !store.state.sdk.then) store.state.sdk.destroyInstance();
    const sdkPromise = createSdk(currentNetwork);
    const sdkThenable = { then: sdkPromise.then.bind(sdkPromise) };
    store.commit('setSdk', sdkThenable);
    const sdk = await sdkThenable.then((s) => s, (error) => {
      handleUnknownError(error);
      return null;
    });
    if (sdkThenable.then === store.state.sdk.then) store.commit('setSdk', sdk);
    else if (sdk) sdk.destroyInstance();
  };

  let lastNetwork;

  store.watch(
    ({ onLine }, { currentNetwork }) => ({ ...currentNetwork, onLine }),
    async (currentNetwork) => {
      if (isEqual(currentNetwork, lastNetwork)) return;
      lastNetwork = currentNetwork;
      await recreateSdk();
    },
    { immediate: true },
  );

  let syncAccountsPromise = Promise.resolve();

  store.watch(
    ({ sdk, accounts: { list } }) => [sdk, list],
    async ([sdk, list]) => {
      syncAccountsPromise = (async () => {
        if (sdk == null) return;
        if (sdk.then) await sdk.then;
        store.commit('setSdkAccounts', list);
      })();
      await syncAccountsPromise;
    },
  );

  store.watch(
    (_state, getters) => getters['accounts/active']?.address,
    async (address) => {
      if (store.state.sdk.then) await store.state.sdk;
      await syncAccountsPromise;
      store.commit('selectSdkAccount', address);
    },
  );
};

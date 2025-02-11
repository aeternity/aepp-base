import { isEqual } from 'lodash-es';
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

      async #ensureCurrentAccountAccessPure() {
        const accessToAccounts = store.getters.getApp(this.host)?.permissions.accessToAccounts ?? [];
        if (accessToAccounts.includes(store.getters['accounts/active'].address)) return;

        const controller = new AbortController();
        const unsubscribe = store.watch(
          (_state, getters) => getters['accounts/active'].address,
          (address) => accessToAccounts.includes(address) && controller.abort(),
        );
        try {
          await store.dispatch(
            'modals/open',
            { name: 'confirmAccountAccess', signal: controller.signal, appHost: this.host },
          );
        } catch (error) {
          if (error.message === 'Modal aborted') return;
          throw error;
        } finally {
          unsubscribe();
        }

        const { address: accountAddress } = store.getters['accounts/active'];
        if (!accessToAccounts.includes(accountAddress)) {
          store.commit('toggleAccessToAccount', { appHost: this.host, accountAddress });
        }
      }

      ensureCurrentAccountAccess() {
        this.accountAccessPromise ??= this.#ensureCurrentAccountAccessPure().finally(() => {
          delete this.accountAccessPromise;
        });
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
      sign: (data, { signal }) => store.dispatch('accounts/sign', { data, signal }),
      signTransaction: (transaction, { signal }) => store.dispatch('accounts/signTransaction', { transaction, signal }),
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

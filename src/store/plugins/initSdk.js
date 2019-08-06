import { get, isEqual } from 'lodash-es';

export default (store) => {
  let recreateSdk;

  const createSdk = async (url) => {
    const [Ae, ChainNode, Transaction, Contract, Aens, Rpc] = (await Promise.all([
      import(/* webpackChunkName: "sdk" */ '@aeternity/aepp-sdk/es/ae'),
      import(/* webpackChunkName: "sdk" */ '@aeternity/aepp-sdk/es/chain/node'),
      import(/* webpackChunkName: "sdk" */ '@aeternity/aepp-sdk/es/tx/tx'),
      import(/* webpackChunkName: "sdk" */ '@aeternity/aepp-sdk/es/ae/contract'),
      import(/* webpackChunkName: "sdk" */ '@aeternity/aepp-sdk/es/ae/aens'),
      import(/* webpackChunkName: "sdk" */ '@aeternity/aepp-sdk/es/rpc/server'),
    ])).map(module => module.default);

    async function confirmAccountAccess({ app }) {
      const accessToAccounts = get(app, 'permissions.accessToAccounts', []);
      if (accessToAccounts.includes(store.getters['accounts/active'].address)) return;
      const promise = store.dispatch(
        'modals/open',
        { name: 'confirmAccountAccess', appHost: app.host },
      );
      const unsubscribe = store.watch(
        (state, getters) => getters['accounts/active'].address,
        address => accessToAccounts.includes(address) && promise.cancel(),
      );

      try {
        await Promise.race([
          promise,
          new Promise((resolve, reject) => promise.finally(() => {
            if (!promise.isCancelled()) return;
            if (accessToAccounts.includes(store.getters['accounts/active'].address)) {
              resolve();
            } else reject(new Error('Unexpected state'));
          })),
        ]);
      } finally {
        unsubscribe();
      }

      const { address: accountAddress } = store.getters['accounts/active'];
      if (!accessToAccounts.includes(accountAddress)) {
        store.commit('toggleAccessToAccount', { appHost: app.host, accountAddress });
      }
    }
    const confirmAccountAccessPromises = {};

    const methods = {
      async address(options) {
        if (options) {
          const { app: { host } } = options;
          confirmAccountAccessPromises[host] = confirmAccountAccessPromises[host]
            || confirmAccountAccess(options);
          try {
            await confirmAccountAccessPromises[host];
          } finally {
            delete confirmAccountAccessPromises[host];
          }
        }
        return store.getters['accounts/active'].address;
      },
      sign: data => store.dispatch('accounts/sign', data),
      signTransaction: txBase64 => store.dispatch('accounts/signTransaction', txBase64),
    };

    let sdkActive = false;
    const sdk = await Ae.compose(
      ChainNode, Transaction, Contract, Aens, Rpc, {
        init(options, { stamp }) {
          const rpcMethods = [
            ...stamp.compose.deepConfiguration.Ae.methods,
            ...stamp.compose.deepConfiguration.Contract.methods,
          ];
          this.rpcMethods = {
            ...rpcMethods
              .map(m => [m, ({ params, origin }) => {
                const { host } = new URL(origin);
                const app = store.getters.getApp(host) || { host };
                return Promise.resolve(this[m](...params, { app }));
              }])
              .reduce((p, [k, v]) => ({ ...p, [k]: v }), {}),
            ...this.rpcMethods,
          };
        },
        methods,
      },
    )({
      url,
      internalUrl: url,
      compilerUrl: 'https://compiler.aepps.com',
      axiosConfig: {
        errorHandler: (error) => {
          if (
            !sdkActive
            || (error.isAxiosError && error.response && error.response.status === 404)
          ) return;
          recreateSdk();
          sdkActive = false;
        },
      },
    });
    sdkActive = true;
    return sdk;
  };

  recreateSdk = async () => {
    const { currentNetwork } = store.getters;
    if (store.state.sdk && !store.state.sdk.then) store.state.sdk.destroyInstance();
    const sdkPromise = createSdk(currentNetwork.url);
    const sdkThenable = { then: sdkPromise.then.bind(sdkPromise) };
    store.commit('setSdk', sdkThenable);
    const sdk = await sdkThenable.then(s => s, () => null);
    if (sdkThenable === store.state.sdk) store.commit('setSdk', sdk);
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
};

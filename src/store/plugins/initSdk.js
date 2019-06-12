import { get, isEqual } from 'lodash-es';

export default (store) => {
  const createSdk = async (url) => {
    const [Ae, ChainNode, Transaction, Contract, Rpc] = (await Promise.all([
      import(/* webpackChunkName: "sdk" */ '@aeternity/aepp-sdk/es/ae'),
      import(/* webpackChunkName: "sdk" */ '@aeternity/aepp-sdk/es/chain/node'),
      import(/* webpackChunkName: "sdk" */ '@aeternity/aepp-sdk/es/tx/tx'),
      import(/* webpackChunkName: "sdk" */ '@aeternity/aepp-sdk/es/ae/contract'),
      import(/* webpackChunkName: "sdk" */ '@aeternity/aepp-sdk/es/rpc/server'),
    ])).map(module => module.default);

    const methods = {
      async address(options) {
        if (options) {
          const { app } = options;
          const accessToAccounts = get(app, 'permissions.accessToAccounts', []);
          if (!accessToAccounts.includes(store.getters['accounts/active'].address)) {
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
        }
        return store.getters['accounts/active'].address;
      },
      sign: data => store.dispatch('accounts/sign', data),
      signTransaction: txBase64 => store.dispatch('accounts/signTransaction', txBase64),
    };

    return Ae.compose(
      ChainNode, Transaction, Contract, Rpc, {
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
    });
  };

  let lastNetwork;
  let latestSdkPromise;

  store.watch(
    ({ onLine }, { currentNetwork }) => ({ ...currentNetwork, onLine }),
    async (currentNetwork) => {
      if (isEqual(currentNetwork, lastNetwork)) return;
      lastNetwork = currentNetwork;
      const sdkPromise = createSdk(currentNetwork.url);
      latestSdkPromise = sdkPromise;
      let sdk = null;
      try {
        sdk = await sdkPromise;
      } finally {
        if (sdkPromise === latestSdkPromise) {
          if (store.state.sdk) store.state.sdk.destroyInstance();
          store.commit('setSdk', sdk);
        } else sdk.destroyInstance();
      }
    },
    { immediate: true },
  );
};

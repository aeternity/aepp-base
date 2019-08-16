import { get, isEqual } from 'lodash-es';
import { handleUnknownError, isNotFoundError } from '../../lib/utils';

export default (store) => {
  let recreateSdk;

  const createSdk = async (network) => {
    const [Ae, ChainNode, Transaction, Contract, Aens, Rpc, Swagger] = (await Promise.all([
      import(/* webpackChunkName: "sdk" */ '@aeternity/aepp-sdk/es/ae'),
      import(/* webpackChunkName: "sdk" */ '@aeternity/aepp-sdk/es/chain/node'),
      import(/* webpackChunkName: "sdk" */ '@aeternity/aepp-sdk/es/tx/tx'),
      import(/* webpackChunkName: "sdk" */ '@aeternity/aepp-sdk/es/ae/contract'),
      import(/* webpackChunkName: "sdk" */ '@aeternity/aepp-sdk/es/ae/aens'),
      import(/* webpackChunkName: "sdk" */ '@aeternity/aepp-sdk/es/rpc/server'),
      import(/* webpackChunkName: "sdk" */ '@aeternity/aepp-sdk/es/utils/swagger'),
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
        if (options.app) {
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
    const errorHandler = (error) => {
      if (sdkActive && !isNotFoundError(error)) {
        recreateSdk();
        sdkActive = false;
      }
      throw error;
    };
    const [sdk, middleware] = await Promise.all([
      Ae.compose(
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
        url: network.url,
        internalUrl: network.url,
        compilerUrl: 'https://compiler.aepps.com',
        axiosConfig: { errorHandler },
      }),
      (async () => {
        const swag = await (await fetch(`${network.middlewareUrl}/middleware/api`)).json();
        return Swagger.compose({
          methods: {
            urlFor: path => network.middlewareUrl + path,
            axiosError: () => errorHandler,
          },
        })({ swag });
      })(),
    ]);
    sdkActive = true;
    sdk.middleware = middleware.api;
    return sdk;
  };

  recreateSdk = async () => {
    const { currentNetwork } = store.getters;
    if (store.state.sdk && !store.state.sdk.then) store.state.sdk.destroyInstance();
    const sdkPromise = createSdk(currentNetwork);
    const sdkThenable = { then: sdkPromise.then.bind(sdkPromise) };
    store.commit('setSdk', sdkThenable);
    const sdk = await sdkThenable.then(s => s, (error) => {
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
};

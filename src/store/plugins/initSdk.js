import { get, isEqual } from 'lodash-es';
import {
  Ae, ChainNode, Transaction, Contract,
} from '@aeternity/aepp-sdk/es';
import Rpc from '@aeternity/aepp-sdk/es/rpc/server';

export default (store) => {
  let lastNetwork;

  store.watch(
    (state, { currentNetwork }) => currentNetwork,
    async (currentNetwork) => {
      if (isEqual(currentNetwork, lastNetwork) && store.state.sdk) return;
      lastNetwork = currentNetwork;

      const methods = {
        async address(options) {
          if (options && !process.env.RUNNING_IN_FRAME) {
            const { app } = options;
            const accessToAccounts = get(app, 'permissions.accessToAccounts', []);
            if (!accessToAccounts.includes(store.getters['accounts/active'].address)) {
              const promise = store.dispatch(
                'modals/confirmAccountAccess',
                { appHost: app.host },
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

      let sdk = null;
      try {
        sdk = await Ae.compose(
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
                    return this[m](...params, { app });
                  }])
                  .reduce((p, [k, v]) => ({ ...p, [k]: v }), {}),
                ...this.rpcMethods,
              };
            },
            methods,
          },
        )({
          url: currentNetwork.url,
          internalUrl: currentNetwork.url,
          compilerUrl: 'https://compiler.aepps.com',
        });
      } finally {
        if (store.state.sdk) store.state.sdk.destroyInstance();
        store.commit('setSdk', sdk);
      }
    },
    { immediate: true },
  );
};

import BigNumber from 'bignumber.js';
import { get } from 'lodash-es';
import {
  Ae, ChainNode, Transaction, Contract, Crypto, TxBuilder,
} from '@aeternity/aepp-sdk/es';
import Rpc from '@aeternity/aepp-sdk/es/rpc/server';
import { OBJECT_ID_TX_TYPE, TX_TYPE } from '@aeternity/aepp-sdk/es/tx/builder/schema';
import { MAGNITUDE } from '../../lib/constants';

export default store => store.watch(
  (state, { currentNetwork }) => currentNetwork.url,
  async (url) => {
    const sign = data => Crypto.sign(
      data,
      store.state.mobile.accounts[store.getters.activeIdentity.address].secretKey,
    );

    const sdk = await Ae.compose(
      ChainNode, Transaction, Contract, Rpc, {
        init(options, { stamp }) {
          const methods = [
            ...stamp.compose.deepConfiguration.Ae.methods,
            ...stamp.compose.deepConfiguration.Contract.methods,
          ];
          this.rpcMethods = {
            ...methods
              .map(m => [m, ({ params, origin }) => {
                const { host } = new URL(origin);
                const app = store.getters.getBookmarkedApp(host) || { host };
                return this[m](...params, { app });
              }])
              .reduce((p, [k, v]) => ({ ...p, [k]: v }), {}),
            ...this.rpcMethods,
          };
        },
        methods: {
          async address(options) {
            if (options) {
              const { app } = options;
              const accessToAccounts = get(app, 'permissions.accessToAccounts', []);
              if (!accessToAccounts.includes(store.getters.activeIdentity.address)) {
                const promise = store.dispatch(
                  'modals/confirmAccountAccess',
                  { appHost: app.host },
                );
                const { route: initialRoute } = store.state;
                const unsubscribe = store.watch(
                  ({ route }, { activeIdentity: { address } }) => ({ route, address }),
                  ({ route, address }) => {
                    if (accessToAccounts.includes(address) || route !== initialRoute) {
                      promise.cancel();
                    }
                  },
                );

                try {
                  await Promise.race([
                    promise,
                    new Promise((resolve, reject) => promise.finally(() => {
                      if (!promise.isCancelled()) return;
                      if (initialRoute !== store.state.route) {
                        reject(new Error('User navigated outside'));
                      } else if (accessToAccounts.includes(store.getters.activeIdentity.address)) {
                        resolve();
                      } else reject(new Error('Unexpected state'));
                    })),
                  ]);
                } finally {
                  unsubscribe();
                }

                const { address: accountAddress } = store.getters.activeIdentity;
                if (!accessToAccounts.includes(accountAddress)) {
                  store.commit('grantAccessToAccount', { appHost: app.host, accountAddress });
                }
              }
            }
            return store.getters.activeIdentity.address;
          },
          async confirmRawDataSigning(data) {
            await store.dispatch('modals/confirmSign', { data });
            return data;
          },
          async sign(data) {
            await this.confirmRawDataSigning(data);
            return sign(data);
          },
          async confirmTxSigning(txBinary) {
            let txObject;
            try {
              txObject = TxBuilder.unpackTx(txBinary, true).tx;
            } catch (e) {
              return this.confirmRawDataSigning(txBinary);
            }

            const confirmActionName = {
              [TX_TYPE.spend]: 'modals/confirmSpend',
              [TX_TYPE.contractCreate]: 'modals/confirmContractDeploy',
              [TX_TYPE.contractCall]: 'modals/confirmContractCall',
            }[OBJECT_ID_TX_TYPE[txObject.tag]];
            if (!confirmActionName) return this.confirmRawDataSigning(txBinary);

            const format = value => BigNumber(value).shiftedBy(-MAGNITUDE);
            const confirmProps = {
              ...txObject,
              amount: format(txObject.amount),
              fee: format(txObject.fee),
              minFee: format(TxBuilder.calculateFee(
                0, OBJECT_ID_TX_TYPE[txObject.tag], { gas: txObject.gas, params: txObject },
              )),
            };

            return TxBuilder.buildTx(
              {
                ...txObject,
                fee: (await store.dispatch(confirmActionName, confirmProps))
                  .shiftedBy(MAGNITUDE),
              },
              OBJECT_ID_TX_TYPE[txObject.tag],
            ).rlpEncoded;
          },
          async signTransaction(txBase64) {
            const encodedTx = await this
              .confirmTxSigning(Crypto.decodeBase64Check(Crypto.assertedType(txBase64, 'tx')));
            const signature = sign(Buffer.concat([Buffer.from(this.nodeNetworkId), encodedTx]));
            return TxBuilder.buildTx({ encodedTx, signatures: [signature] }, TX_TYPE.signed).tx;
          },
        },
      },
    )({ url, internalUrl: url });

    if (store.state.sdk) store.state.sdk.destroyInstance();
    store.commit('setSdk', sdk);
  },
  { immediate: true },
);

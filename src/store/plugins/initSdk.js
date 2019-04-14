import BigNumber from 'bignumber.js';
import { get } from 'lodash-es';
import {
  Ae, ChainNode, Transaction, Contract, Crypto, TxBuilder,
} from '@aeternity/aepp-sdk/es';
import Rpc from '@aeternity/aepp-sdk/es/rpc/server';
import { OBJECT_ID_TX_TYPE, TX_TYPE } from '@aeternity/aepp-sdk/es/tx/builder/schema';
import { MAGNITUDE } from '../../lib/constants';

export default store => store.watch(
  (state, { currentNetwork }) => currentNetwork,
  async (currentNetwork) => {
    const methods = {
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
    };

    if (process.env.IS_MOBILE_DEVICE) {
      const sign = data => Crypto.sign(
        data,
        store.state.mobile.accounts[store.getters.activeIdentity.address].secretKey,
      );
      const confirmRawDataSigning = async (data) => {
        await store.dispatch('modals/confirmSign', { data });
        return data;
      };
      const confirmTxSigning = async (txBinary) => {
        let txObject;
        try {
          txObject = TxBuilder.unpackTx(txBinary, true).tx;
        } catch (e) {
          return confirmRawDataSigning(txBinary);
        }

        const confirmActionName = {
          [TX_TYPE.spend]: 'modals/confirmSpend',
          [TX_TYPE.contractCreate]: 'modals/confirmContractDeploy',
          [TX_TYPE.contractCall]: 'modals/confirmContractCall',
        }[OBJECT_ID_TX_TYPE[txObject.tag]];
        if (!confirmActionName) return confirmRawDataSigning(txBinary);

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
      };

      Object.assign(methods, {
        async sign(data) {
          await confirmRawDataSigning(data);
          return sign(data);
        },
        async signTransaction(txBase64) {
          const encodedTx = await confirmTxSigning(
            Crypto.decodeBase64Check(Crypto.assertedType(txBase64, 'tx')),
          );
          const signature = sign(Buffer.concat([Buffer.from(this.nodeNetworkId), encodedTx]));
          return TxBuilder.buildTx({ encodedTx, signatures: [signature] }, TX_TYPE.signed).tx;
        },
      });
    } else {
      Object.assign(methods, {
        sign: () => {
          throw new Error('Not implemented yet');
        },
        async signTransaction(txBase64) {
          let res = txBase64;
          if (store.state.desktop.ledgerConnected) {
            const txObject = TxBuilder.unpackTx(txBase64).tx;
            res = TxBuilder.buildTx(
              {
                ...txObject,
                fee: (await store.dispatch('modals/getLedgerTransactionFee'))
                  .shiftedBy(MAGNITUDE),
              },
              OBJECT_ID_TX_TYPE[txObject.tag],
            ).tx;
          }
          return store.dispatch('signTransaction', [res]);
        },
      });
    }

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
      )({ url: currentNetwork.url, internalUrl: currentNetwork.url });
    } catch (error) {
      if (error.message === 'Network Error') {
        store.dispatch('setNotification', {
          text: `Can't connect to '${currentNetwork.name}' network`,
          autoClose: true,
        });
        return;
      }
      throw error;
    } finally {
      if (store.state.sdk) store.state.sdk.destroyInstance();
      store.commit('setSdk', sdk);
    }
  },
  { immediate: true },
);

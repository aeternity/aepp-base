import BigNumber from 'bignumber.js';
import {
  Ae, Transaction, Contract, EpochChain, EpochContract, EpochOracle, Crypto, TxBuilder,
} from '@aeternity/aepp-sdk/es';
import Rpc from '@aeternity/aepp-sdk/es/rpc/server';
import { OBJECT_ID_TX_TYPE, TX_TYPE } from '@aeternity/aepp-sdk/es/tx/builder/schema';
import { MAGNITUDE } from '../../lib/constants';
import { appsRegistry } from '../../lib/appsRegistry';

export default store => store.watch(
  (state, { currentNetwork }) => currentNetwork.url,
  async (url) => {
    const appsPermissions = {};
    const sign = data => Crypto.sign(
      data,
      store.state.mobile.accounts[store.getters.activeIdentity.address].secretKey,
    );

    const sdk = await Ae.compose(
      Transaction, Contract, EpochChain, EpochContract, EpochOracle, Rpc, {
        init(options, { stamp }) {
          const methods = [
            ...stamp.compose.deepConfiguration.Ae.methods,
            ...stamp.compose.deepConfiguration.Contract.methods,
          ];
          this.rpcMethods = {
            ...methods
              .map(m => [m, ({ params, origin }) => {
                const { host } = new URL(origin);
                const app = Object.entries(appsRegistry).find(([, a]) => a.path === host);
                const appId = app ? app[0] : host;
                appsPermissions[appId] = appsPermissions[appId] || {};
                return this[m](...params, {
                  appName: app ? app[1].name : host,
                  appPermissions: appsPermissions[appId],
                });
              }])
              .reduce((p, [k, v]) => ({ ...p, [k]: v }), {}),
            ...this.rpcMethods,
          };
        },
        methods: {
          async address(options) {
            if (options) {
              const { appName, appPermissions } = options;
              if (!appPermissions.address) {
                await store.dispatch('modals/confirmAccountAccess', { appName });
              }
              appPermissions.address = true;
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

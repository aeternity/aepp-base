import {
  Ae, Transaction, Contract, EpochContract, EpochOracle, Chain, MemoryAccount,
} from '@aeternity/aepp-sdk';
import Rpc from '@aeternity/aepp-sdk/es/rpc/server';
import { MAGNITUDE } from '../../lib/constants';
import { appsRegistry } from '../../lib/appsRegistry';

export default (store) => {
  const epochWrapperMethods = Chain.compose.deepConfiguration.Ae.methods.reduce(
    (p, method) => ({
      ...p,
      [method]: (...args) => store.state.epoch[method](...args),
    }),
    {},
  );

  const commonStamps = [Transaction, Contract, EpochContract, EpochOracle];
  const appsPermissions = {};
  let sdkForCurrentAccount = {};

  const sdk = Ae.compose(...commonStamps, Rpc, {
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
      ...epochWrapperMethods,
      async address(...args) {
        const { appName, appPermissions } = args.pop();
        if (!appPermissions.address) {
          await store.dispatch('modals/confirmAccountAccess', { appName });
        }
        appPermissions.address = true;
        return sdkForCurrentAccount.address(...args);
      },
      async sign(...args) {
        await store.dispatch('modals/confirmSign', { data: args[0] });
        return sdkForCurrentAccount.sign(...args);
      },
      async spend(amount, recipientId, { stepIcon, ...options } = {}) {
        const fee = (await store.dispatch('modals/confirmSpend', {
          amount: amount.shiftedBy(-MAGNITUDE),
          recipientId,
          stepIcon,
        })).shiftedBy(MAGNITUDE);
        return sdkForCurrentAccount.spend(amount, recipientId, { ...options, fee });
      },
      async contractDeploy(...args) {
        await store.dispatch('modals/confirmContractDeploy', {
          contractByteCode: args[0],
        });
        return sdkForCurrentAccount.contractDeploy(...args);
      },
      async contractCall(...args) {
        await store.dispatch('modals/confirmContractCall', {
          contractAddress: args[2],
          methodName: args[3],
          methodArguments: args[4].args,
        });
        return sdkForCurrentAccount.contractCall(...args);
      },
    },
  })();

  store.watch(
    ({ mobile, epoch }, { activeIdentity }) => activeIdentity && ({
      keypair: {
        publicKey: activeIdentity.address,
        secretKey: Buffer.from(mobile.accounts[activeIdentity.address].secretKey).toString('hex'),
      },
      epoch,
    }),
    ({ keypair, epoch } = {}) => {
      if (!keypair || !epoch) return;

      sdkForCurrentAccount = Ae.compose(MemoryAccount, ...commonStamps, {
        methods: epochWrapperMethods,
      })({ keypair });
      Object.assign(sdkForCurrentAccount, epoch);
      store.commit('assignToSdk', epoch);
    },
    { immediate: true },
  );

  store.commit('setSdk', sdk);
};

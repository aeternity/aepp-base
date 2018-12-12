import { EpochChain } from '@aeternity/aepp-sdk/es';

export default store =>
  store.watch(
    (state, { currentNetwork }) => currentNetwork,
    async ({ url, id }) => {
      const epoch = await EpochChain({ url, internalUrl: url });
      store.commit('setEpoch', epoch);
      store.commit('setNetworkId', id);
    },
    { immediate: true },
  );

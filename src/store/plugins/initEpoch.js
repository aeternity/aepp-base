import { EpochChain } from '@aeternity/aepp-sdk/es';

export default store =>
  store.watch(
    ({ rpcUrl }) => rpcUrl,
    async (rpcUrl) => {
      const epoch = await EpochChain({ url: rpcUrl, internalUrl: rpcUrl });
      store.commit('setEpoch', epoch);
      store.commit('setNetworkId', (await epoch.api.getStatus()).genesisKeyBlockHash.slice(-8));
    },
    { immediate: true },
  );

import { EpochChain } from '@aeternity/aepp-sdk/es';
import networksRegistry from '../../lib/networksRegistry';

export default store =>
  store.watch(
    ({ rpcUrl }) => rpcUrl,
    async (rpcUrl) => {
      const epoch = await EpochChain({ url: rpcUrl, internalUrl: rpcUrl });
      store.commit('setEpoch', epoch);
      const network = networksRegistry.find(({ url }) => url === rpcUrl);
      store.commit('setNetworkId', network.id);
    },
    { immediate: true },
  );

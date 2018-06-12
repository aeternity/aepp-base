import Epoch from '@aeternity/aepp-sdk'

export default store =>
  store.watch(
    ({ rpcUrl }) => rpcUrl,
    async rpcUrl => {
      const epoch = await Epoch.create(rpcUrl)
      store.commit('setEpoch', epoch)
      store.commit('setNetworkId', (await epoch.api.getVersion()).genesisHash.slice(-8))
    },
    { immediate: true })

import Epoch from '@aeternity/aepp-sdk'

export default store =>
  store.watch(
    ({ rpcUrl }) => rpcUrl,
    async rpcUrl => {
      const epoch = await Epoch.create(rpcUrl)
      store.commit('setEpoch', epoch)
      store.commit('setNetworkId', (await epoch.getVersion()).genesis_hash.slice(-8))
    },
    { immediate: true })

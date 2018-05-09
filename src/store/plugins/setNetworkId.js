export default store =>
  store.watch(
    (state, { web3 }) => web3,
    async web3 => store.commit('setNetworkId', await web3.eth.net.getId()),
    { immediate: true })

export default store => {
  let interval
  store.watch(
    (state, { activeIdentity }) => activeIdentity && activeIdentity.address,
    (address) => {
      clearInterval(interval)
      if (!address) return
      interval = setInterval(() =>
        store.dispatch('updateBalance', address), 3000)
    },
    { immediate: true })
}

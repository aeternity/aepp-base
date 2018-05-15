export default store =>
  store.subscribe(({ type, payload: fKey }, state) => {
    if (type !== 'followerConnected') return
    const follower = state.mobile.followers[fKey]
    if (follower.disconnectedAt) return
    store.dispatch('setNotification', {
      text: `You successfully connected ${follower.name}`,
      autoClose: true
    })
  })

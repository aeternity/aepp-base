export default store => store.subscribe(({ type, payload: followerId }, state) => {
  if (type !== 'followerConnected') return;
  const follower = state.mobile.followers[followerId];
  if (follower.disconnectedAt) return;
  store.dispatch('setNotification', {
    text: `You successfully connected ${follower.name}`,
    autoClose: true,
  });
});

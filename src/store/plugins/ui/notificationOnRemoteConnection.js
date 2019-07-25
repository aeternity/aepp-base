import { i18n } from './languages';

export default store => store.subscribe(({ type, payload: followerId }, state) => {
  if (type !== 'followerConnected') return;
  const follower = state.mobile.followers[followerId];
  if (follower.disconnectedAt) return;
  store.dispatch('modals/open', {
    name: 'notification',
    text: i18n.t('remote-connection.connect-notification', [follower.name]),
  });
});

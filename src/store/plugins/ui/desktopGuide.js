import { i18n } from './languages';

export default (store) => {
  store.watch(
    (state, { loggedIn }) => loggedIn,
    async (loggedIn) => {
      if (!loggedIn || !store.state.desktop.showGuideOnStartup) return;
      await store.dispatch('modals/open', {
        name: 'alert',
        text: i18n.t('guide-desktop'),
      });
      store.commit('markGuideAsRead');
    },
    { immediate: true },
  );
};

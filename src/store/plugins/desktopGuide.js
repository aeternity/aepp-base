export default (store) => {
  store.watch(
    (state, { loggedIn }) => loggedIn,
    async (loggedIn) => {
      if (!loggedIn || !store.state.desktop.showGuideOnStartup) return;
      await store.dispatch('modals/guide');
      store.commit('markGuideAsRead');
    },
    { immediate: true },
  );
};

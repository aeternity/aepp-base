export default (store) => {
  store.watch(
    (state, { loggedIn }) => loggedIn,
    async (loggedIn) => {
      if (!loggedIn || !store.state.desktop.showGuideOnStartup) return;
      await store.dispatch('modals/alert', {
        text: `
          The Base æpp can currently work only when opened in a single browser tab.
          Please close any additional instances (tabs) running the Base æpp.
        `,
      });
      store.commit('markGuideAsRead');
    },
    { immediate: true },
  );
};

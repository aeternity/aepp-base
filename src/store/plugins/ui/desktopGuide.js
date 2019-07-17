export default (store) => {
  store.watch(
    (state, { loggedIn }) => loggedIn,
    async (loggedIn) => {
      if (!loggedIn || !store.state.desktop.showGuideOnStartup) return;
      await store.dispatch('modals/open', {
        name: 'alert',
        text: `
          The Base æpp can currently work only when opened in a single browser tab.
          If you have any additional instances (tabs) of the Base æpp open, please close them.
        `,
      });
      store.commit('markGuideAsRead');
    },
    { immediate: true },
  );
};

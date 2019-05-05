export default (store) => {
  store.watch(
    ({ route }) => route,
    ({ name, fullPath } = {}) => {
      if (['apps', 'app-browser'].includes(name)) {
        store.commit('setBrowserPath', fullPath);
      }
    },
    { immediate: true },
  );
};

export default (store) => {
  store.watch(
    ({ route }) => route,
    ({ name, fullPath, params } = {}) => {
      if (['apps', 'app-browser'].includes(name)) {
        store.commit('setBrowserPath', fullPath);
      } else if (
        ['name-list', 'name-list-personal', 'name-list-character-length'].includes(name)
      ) {
        store.commit('setNameListRoute', { name, params });
      }
    },
    { immediate: true },
  );
};

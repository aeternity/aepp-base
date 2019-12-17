import { NAME_LIST_ROUTE_NAMES } from '../../../lib/constants';

export default (store) => {
  store.watch(
    ({ route }) => route,
    ({ name, fullPath, params } = {}) => {
      if (name === 'app-browser') {
        store.commit('setBrowserPath', fullPath);
      } else if (NAME_LIST_ROUTE_NAMES.includes(name)) {
        store.commit('setNameListRoute', { name, params });
      }
    },
    { immediate: true },
  );
};

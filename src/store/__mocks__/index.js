import { noop } from 'lodash-es';

const store = {
  subscribe: noop,
  watch: noop,
};

export default store;

export const mockStore = (newStore) => {
  Object.keys(store).forEach(key => delete store[key]);
  Object.assign(store, newStore);
};

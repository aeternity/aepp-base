import { merge } from 'lodash-es';
import runMigrations from '../migrations';

const KEY = 'vuex';

const setState = state => localStorage.setItem(
  KEY,
  JSON.stringify(state, (key, value) => (value instanceof ArrayBuffer
    ? { type: 'ArrayBuffer', data: Array.from(new Uint8Array(value)) }
    : value)),
);

const getState = () => JSON.parse(
  localStorage.getItem(KEY),
  (key, value) => (value && value.type === 'ArrayBuffer'
    ? new Uint8Array(value.data).buffer
    : value),
);

export default reducer => (store) => {
  const savedState = runMigrations(getState(), store);

  if (savedState) {
    store.replaceState(merge({}, store.state, savedState));
  }

  store.subscribe((mutation, state) => setState(reducer(state)));
};

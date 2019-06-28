import { merge } from 'lodash-es';
import runMigrations from '../migrations';

const KEY = 'vuex';

const setState = state => localStorage.setItem(
  KEY,
  JSON.stringify(state, (key, value) => {
    if (value instanceof ArrayBuffer) {
      return { type: 'ArrayBuffer', data: Array.from(new Uint8Array(value)) };
    }
    if (value instanceof Uint8Array) {
      return { type: 'Uint8Array', data: Array.from(value) };
    }
    return value;
  }),
);

const getState = () => JSON.parse(
  localStorage.getItem(KEY),
  (key, value) => {
    if (value && value.type === 'ArrayBuffer') {
      return new Uint8Array(value.data).buffer;
    }
    if (value && value.type === 'Uint8Array') {
      return new Uint8Array(value.data);
    }
    return value;
  },
);

export const resetState = () => {
  localStorage.removeItem(KEY);
  window.location = process.env.IS_CORDOVA ? './index.html' : '/';
};

export default (reducerLoad, reducerSave) => (store) => {
  const savedState = getState();
  const migratedState = reducerLoad(runMigrations(savedState, store));
  let resetting = false;

  store.replaceState(merge({}, store.state, migratedState));

  store.subscribe((mutation, state) => {
    if (resetting) return;
    setState(reducerSave(state));
  });

  store.registerModule('persistState', {
    actions: {
      reset() {
        resetting = true;
        resetState();
      },
    },
  });
};

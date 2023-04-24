const KEY = 'vuex';

const setState = (state) => localStorage.setItem(
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
  window.location = process.env.VUE_APP_CORDOVA ? './index.html' : '/';
};

export default (reducerLoad, reducerSave) => (store) => {
  let resetting = false;
  let lastEmitedState = reducerLoad(getState(), store);
  store.commit('syncState', lastEmitedState);

  store.subscribe(({ type, payload }, state) => {
    if (resetting || (type === 'syncState' && payload === lastEmitedState)) return;
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

  window.addEventListener('storage', () => {
    lastEmitedState = reducerLoad(getState());
    store.commit('syncState', lastEmitedState);
  });
};

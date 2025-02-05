/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */
const modals = {};

export const registerModal = ({
  name, component, hidePage = false, allowRedirect = false, dontGrayscalePage = false,
}) => {
  if (modals[name]) throw new Error(`Modal with name "${name}" already registered`);
  modals[name] = {
    component, hidePage, allowRedirect, grayscalePage: !dontGrayscalePage,
  };
};

export const swallowModalAborted = (error) => {
  if (error.message === 'Modal aborted') return;
  throw error;
};

export default (store) => {
  store.registerModule('modals', {
    namespaced: true,
    state: { opened: [] },
    mutations: {
      open(state, modal) {
        state.opened.push(modal);
      },
      closeByKey(state, key) {
        const idx = state.opened.findIndex((modal) => modal.key === key);
        if (idx === -1) throw new Error(`Modal not found by key ${key.toString()}`);
        state.opened.splice(idx, 1);
      },
    },
    getters: {
      opened: ({ opened }) => opened
        .map(({ name, ...other }) => ({ ...modals[name], ...other }))
        .reduceRight((acc, modal) => (acc.length && acc[0].hidePage ? acc : [modal, ...acc]), []),
      hidePage: (state, { opened }) => opened.some(({ hidePage }) => hidePage),
      grayscalePage: (state, { opened }) => opened.some(({ grayscalePage }) => grayscalePage),
    },
    actions: {
      open({ commit }, { name, signal, allowRedirect, ...props }) {
        if (!modals[name]) return Promise.reject(new Error(`Modal with name "${name}" not registered`));
        const key = Symbol(`modal-${name}-${Date.now() % 1e4}`);
        let abort;
        return new Promise((resolve, reject) => {
          abort = () => reject(new Error('Modal aborted'));
          signal?.addEventListener('abort', abort);
          commit('open', {
            name, key, allowRedirect, props: { ...props, resolve, reject },
          });
        }).finally(() => {
          signal?.removeEventListener('abort', abort);
          commit('closeByKey', key);
        });
      },
    },
  });

  store.watch(
    ({ route }) => route,
    () => store.state.modals.opened
      .filter(({ name, allowRedirect }) => !modals[name].allowRedirect && !allowRedirect)
      .forEach(({ props: { reject } }) => reject(new Error('User navigated outside'))),
  );
};

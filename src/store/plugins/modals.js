/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */
import Promise from 'bluebird';

Promise.config({
  cancellation: true,
});

const modals = {};
let modalCounter = 0;

export const registerModal = ({ name, component, hidePage = false }) => {
  if (modals[name]) throw new Error(`Modal with name "${name}" already registered`);
  modals[name] = { component, hidePage };
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
        const idx = state.opened.findIndex(modal => modal.key === key);
        state.opened.splice(idx, 1);
      },
    },
    getters: {
      opened: ({ opened }) => opened
        .map(({ name, ...other }) => ({ ...modals[name], ...other }))
        .reduceRight((acc, modal) => (acc.length && acc[0].hidePage ? acc : [modal, ...acc]), []),
    },
    actions: Object.keys(modals).reduce((p, name) => ({
      ...p,
      [name]({ commit }, props) {
        const key = modalCounter;
        modalCounter += 1;
        return new Promise(
          (resolve, reject) => commit('open', { name, key, props: { ...props, resolve, reject } }),
        )
          .finally(() => commit('closeByKey', key));
      },
    }), {}),
  });

  store.watch(
    ({ route }) => route,
    () => store.state.modals.opened
      .forEach(({ props: { reject } }) => reject(new Error('User navigated outside'))),
  );
};

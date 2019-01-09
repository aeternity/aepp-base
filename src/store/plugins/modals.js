/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */
import { upperFirst } from 'lodash-es';
import Promise from 'bluebird';

Promise.config({
  cancellation: true,
});

const modals = {};

export const registerModal = ({ name, component, hidePage = false }) => {
  if (modals[name]) throw new Error(`Modal with name "${name}" already registered`);
  modals[name] = { component, hidePage };
};

const getPushName = name => `push${upperFirst(name)}ModalProps`;
const getRemoveByIdx = name => `removeByIdx${upperFirst(name)}ModalProps`;

export default (store) => {
  store.registerModule('modals', {
    namespaced: true,
    state: Object.keys(modals).reduce((p, name) => ({ ...p, [name]: [] }), {}),
    mutations: Object.keys(modals).reduce((p, name) => ({
      ...p,
      [getPushName(name)](state, props) {
        state[name].push(props);
      },
      [getRemoveByIdx(name)](state, idx) {
        state[name].splice(idx, 1);
      },
    }), {}),
    getters: {
      name: (state) => {
        const modal = Object.entries(state).find(([, props]) => props.length);
        return modal && modal[0];
      },
      component: (state, { name }) => name && modals[name].component,
      hidePage: (state, { name }) => name && modals[name].hidePage,
      props: (state, { name }) => name && state[name][0],
    },
    actions: Object.keys(modals).reduce((p, name) => ({
      ...p,
      [name]({ state, commit }, props) {
        let propsIdx;
        return new Promise((resolve, reject) => {
          commit(getPushName(name), { ...props, resolve, reject });
          propsIdx = state[name].length - 1;
        }).finally(() => commit(getRemoveByIdx(name), propsIdx));
      },
    }), {}),
  });
};

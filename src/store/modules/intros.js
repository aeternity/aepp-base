import Vue from 'vue';
import { i18n } from '../plugins/ui/languages';

export default {
  namespaced: true,

  state: {
    read: {},
  },

  getters: {
    intros: () => ({
      apps: i18n.t('app.intro'),
      names: i18n.t('name.intro'),
    }),
  },

  mutations: {
    markAsRead({ read }, key) {
      Vue.set(read, key, true);
    },
  },

  actions: {
    async ensureRead({
      state: { read }, getters: { intros }, commit, dispatch,
    }, key) {
      if (read[key]) return;
      await dispatch('modals/open', { name: 'showIntro', content: intros[key] }, { root: true });
      commit('markAsRead', key);
    },
  },
};

/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */

import Vue from 'vue';
import { i18n } from '../plugins/ui/languages';

export default {
  state: {
    followers: {},
    stepFraction: null,
    browserPath: { name: 'app-browser' },
    readSecurityCourses: [],
    skipAddingToHomeScreen: false,
  },

  getters: {
    loggedIn: (state, getters, { accounts: { hdWallet: { wallet } } }) => !!wallet,
  },

  mutations: {
    addFollower(state, follower) {
      Vue.set(state.followers, follower.id, follower);
    },
    removeFollower(state, followerId) {
      Vue.delete(state.followers, followerId);
    },
    followerConnected(state, followerId) {
      Vue.set(state.followers[followerId], 'connected', true);
    },
    followerDisconnected(state, followerId) {
      Vue.delete(state.followers[followerId], 'connected');
      Vue.set(state.followers[followerId], 'disconnectedAt', Date.now());
    },
    followerRemoved(state, followerId) {
      Vue.delete(state.followers, followerId);
    },
    setStepFraction(state, stepFraction = null) {
      state.stepFraction = stepFraction;
    },
    setBrowserPath(state, browserPath) {
      state.browserPath = browserPath;
    },
    markSecurityCourseAsRead(state, courseName) {
      if (state.readSecurityCourses.includes(courseName)) return;
      state.readSecurityCourses.push(courseName);
    },
    skipAddingToHomeScreen(state) {
      state.skipAddingToHomeScreen = true;
    },
  },

  actions: {
    removeFollower({ state: { followers }, commit, dispatch }, followerId) {
      dispatch('modals/open', {
        name: 'notification',
        text: i18n.t('remote-connection.revoke-notification', [followers[followerId].name]),
      });
      commit('removeFollower', followerId);
    },

    async share(_, options) {
      await (process.env.IS_CORDOVA
        ? new Promise(resolve => window.plugins.socialsharing.shareW3C(
          options,
          ({ app }) => app && resolve(),
        ))
        : navigator.share(options));
    },
  },
};

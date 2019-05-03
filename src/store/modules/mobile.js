/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */

import Vue from 'vue';

export default {
  state: {
    followers: {},
    stepFraction: null,
    browserPath: '',
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
  },
};

/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */

export default {
  state: {
    remoteConnected: false,
    leaderConnected: false,
    ledgerSupported: false,
    showSidebar: false,
    showGuideOnStartup: true,
  },

  getters: {
    loggedIn: (state, getters, { accounts: { list } }) => !!list.length,
  },

  mutations: {
    setRemoteConnected(state, remoteConnected) {
      state.showSidebar = false;
      state.remoteConnected = remoteConnected;
    },
    setLeaderConnected(state, leaderConnected) {
      state.leaderConnected = leaderConnected;
    },
    setLedgerSupported(state, ledgerSupported) {
      state.ledgerSupported = ledgerSupported;
    },
    toggleSidebar(state) {
      state.showSidebar = !state.showSidebar;
    },
    markGuideAsRead(state) {
      state.showGuideOnStartup = false;
    },
  },
};

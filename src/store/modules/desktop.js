/* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["state"] }] */

export default {
  state: {
    remoteConnected: false,
    ledgerSupported: false,
    showSidebar: false,
  },

  getters: {
    loggedIn: (state, getters, { accounts: { list } }) => !!list.length,
  },

  mutations: {
    setRemoteConnected(state, remoteConnected) {
      state.showSidebar = false;
      state.remoteConnected = remoteConnected;
    },
    setLedgerSupported(state, ledgerSupported) {
      state.ledgerSupported = ledgerSupported;
    },
    toggleSidebar(state) {
      state.showSidebar = !state.showSidebar;
    },
  },
};

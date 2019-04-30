export default {
  migrate(state) {
    if (!process.env.IS_MOBILE_DEVICE) return state;

    const newState = { ...state };
    newState.accounts = {
      list: state.mobile.names.map((name, idx) => ({
        name,
        source: { type: 'hd-wallet', idx },
      })),
      activeIdx: state.selectedIdentityIdx,
      hdWallet: {
        encryptedWallet: state.mobile.keystore,
      },
    };
    newState.sdkUrl = state.rpcUrl;

    return newState;
  },
};

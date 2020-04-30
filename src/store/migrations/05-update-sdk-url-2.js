export default {
  migrate(state) {
    const newState = { ...state };
    newState.sdkUrl = {
      'https://mainnet.aeternal.io': 'https://mainnet.aeternity.io',
      'https://testnet.aeternal.io': 'https://testnet.aeternity.io',
    }[newState.sdkUrl] || newState.sdkUrl;
    return newState;
  },
};

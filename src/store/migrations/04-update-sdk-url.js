export default {
  migrate(state) {
    const newState = { ...state };
    newState.sdkUrl = {
      'https://sdk-mainnet.aepps.com': 'https://node.mainnet.aeternal.io',
      'https://sdk-testnet.aepps.com': 'https://node.testnet.aeternal.io',
    }[newState.sdkUrl] || newState.sdkUrl;
    return newState;
  },
};

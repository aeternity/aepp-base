const mainNetwork = {
  name: 'Iris-net',
  url: 'https://mainnet.aeternity.io',
  middlewareUrl: 'https://mainnet.aeternity.io/mdw',
  explorerUrl: 'https://aescan.io',
};

const testNetwork = {
  name: 'Testnet',
  url: 'https://testnet.aeternity.io',
  middlewareUrl: 'https://testnet.aeternity.io/mdw',
  explorerUrl: 'https://testnet.aescan.io',
};

const envNetwork = {
  name: process.env.VUE_APP_NETWORK_NAME,
  url: process.env.VUE_APP_NODE_URL,
  middlewareUrl: process.env.VUE_APP_MIDDLEWARE_URL,
  explorerUrl: process.env.VUE_APP_EXPLORER_URL,
};

const networks = (() => {
  if (!['', '$VUE_APP_NETWORK_NAME'].includes(window.overrideNetwork.name)) {
    return [window.overrideNetwork];
  }
  if (envNetwork.name) return [envNetwork];
  if (process.env.NODE_ENV === 'production') return [mainNetwork, testNetwork];
  return [testNetwork, mainNetwork];
})();

export default Object.freeze(networks.map(Object.freeze));

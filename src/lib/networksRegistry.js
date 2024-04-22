const mainNetwork = {
  name: `${Date.now() < 1715072400000 ? 'Iris' : 'Ceres'}-net`,
  url: 'https://mainnet.aeternity.io',
  middlewareUrl: 'https://mainnet.aeternity.io/mdw',
  explorerUrl: 'https://aescan.io',
};

const testNetwork = {
  name: `Testnet${Date.now() < 1713947400000 ? ' (Iris)' : ''}`,
  url: 'https://testnet.aeternity.io',
  middlewareUrl: 'https://testnet.aeternity.io/mdw',
  explorerUrl: 'https://testnet.aescan.io',
};

// Source https://forum.aeternity.com/t/the-proposed-changes-in-ceres-protocol/12056/33
const testCeresNetworkHideAt = new Date('2024-04-30');
const testCeresNetwork = {
  name: `Testnet Ceres (till ${testCeresNetworkHideAt.toLocaleDateString()})`,
  url: 'https://next.aeternity.io',
  middlewareUrl: 'https://next.aeternity.io:8443',
  explorerUrl: 'https://explorer.ceres.aepps.com',
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
  const list = process.env.NODE_ENV === 'production'
    ? [mainNetwork, testNetwork] : [testNetwork, mainNetwork];
  if (Date.now() < testCeresNetworkHideAt) list.push(testCeresNetwork);
  return list;
})();

export default Object.freeze(networks.map(Object.freeze));

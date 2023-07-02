const mainNetwork = {
  name: 'Iris-net',
  url: 'https://mainnet.aeternity.io',
  middlewareUrl: 'https://mainnet.aeternity.io/mdw',
  explorerUrl: 'https://explorer.aeternity.io',
};

const testNetwork = {
  name: 'Testnet',
  url: 'https://testnet.aeternity.io',
  middlewareUrl: 'https://testnet.aeternity.io/mdw',
  explorerUrl: 'https://explorer.testnet.aeternity.io',
};

let networks = process.env.NODE_ENV === 'production' ? [
  mainNetwork,
  testNetwork,
] : [
  testNetwork,
  mainNetwork,
];

export const defaultNetwork = process.env.VUE_APP_NETWORK_NAME ? {
  name: process.env.VUE_APP_NETWORK_NAME,
  url: process.env.VUE_APP_NODE_URL,
  middlewareUrl: process.env.VUE_APP_MDW_URL,
  explorerUrl: process.env.VUE_APP_EXPLORER_URL,
} : mainNetwork;

if (process.env.VUE_APP_NETWORK_NAME) {
  networks = [defaultNetwork];
}

export default Object.freeze(networks.map(Object.freeze));

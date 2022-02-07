export const defaultNetwork = {
  name: 'Iris-net',
  url: 'https://mainnet.aeternity.io',
  middlewareUrl: 'https://mainnet.aeternity.io/mdw',
  explorerUrl: 'https://explorer.aeternity.io',
  compilerUrl: 'https://compiler.aepps.com',
};

const testNetwork = {
  name: 'Testnet',
  url: 'https://testnet.aeternity.io',
  middlewareUrl: 'https://testnet.aeternity.io/mdw',
  explorerUrl: 'https://explorer.testnet.aeternity.io',
  compilerUrl: 'https://compiler.aepps.com',
};

export default Object.freeze((process.env.NODE_ENV === 'production' ? [
  defaultNetwork,
  testNetwork,
] : [
  testNetwork,
  defaultNetwork,
]).map(Object.freeze));

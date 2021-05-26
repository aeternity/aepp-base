const getMiddlewareUrl = networkName => `https://${networkName}.aeternity.io`;

const genNetwork = (name, { pathName = name.toLowerCase(), ...options } = {}) => ({
  name,
  url: getMiddlewareUrl(pathName),
  middlewareUrl: getMiddlewareUrl(pathName),
  explorerUrl: getMiddlewareUrl(pathName),
  compilerUrl: 'https://compiler.aepps.com',
  ...options,
});

export const defaultNetwork = genNetwork('Lima-net', { pathName: 'mainnet' });

const testNetwork = genNetwork('Testnet');

export default Object.freeze((process.env.NODE_ENV === 'production' ? [
  defaultNetwork,
  testNetwork,
] : [
  testNetwork,
  defaultNetwork,
]).map(Object.freeze));

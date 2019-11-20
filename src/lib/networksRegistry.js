import { pick } from 'lodash-es';

const getMiddlewareUrl = networkName => `https://${networkName}.aeternal.io`;

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
  genNetwork('Unstable'),
  genNetwork('Edgenet', pick(defaultNetwork, ['middlewareUrl'])),
]).map(Object.freeze));

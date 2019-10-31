import { pick } from 'lodash-es';

const getUrl = networkName => `https://node.${networkName}.aeternal.io`;
const getMiddlewareUrl = networkName => `https://${networkName}.aeternal.io`;
const getExplorerUrl = (networkName = '') => `https://${networkName}${networkName ? '.' : ''}explorer.aepps.com`;

const genNetwork = (name, { pathName = name.toLowerCase(), ...options } = {}) => ({
  name,
  url: getUrl(pathName),
  middlewareUrl: getMiddlewareUrl(pathName),
  explorerUrl: getExplorerUrl(pathName),
  compilerUrl: 'https://compiler.aepps.com',
  ...options,
});

export const defaultNetwork = genNetwork('Lima-net', {
  pathName: 'mainnet',
  explorerUrl: getExplorerUrl(),
});

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

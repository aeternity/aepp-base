import { pick } from 'lodash-es';

const getUrl = networkName => `https://sdk-${networkName}.aepps.com`;
const getMiddlewareUrl = (networkName = '') => `https://${networkName}${networkName ? '.' : ''}mdw.aepps.com`;
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
  middlewareUrl: getMiddlewareUrl(),
  explorerUrl: getExplorerUrl(),
});

const testNetwork = genNetwork('Testnet', {
  url: 'https://node.testnet.aeternal.io',
  middlewareUrl: 'https://testnet.aeternal.io',
  compilerUrl: 'https://latest.compiler.aepps.com',
});

export default Object.freeze((process.env.NODE_ENV === 'production' ? [
  defaultNetwork,
  testNetwork,
] : [
  testNetwork,
  defaultNetwork,
  genNetwork('Unstable'),
  genNetwork('Edgenet', pick(defaultNetwork, ['middlewareUrl'])),
]).map(Object.freeze));

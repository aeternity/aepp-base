import { pick } from 'lodash-es';

const getUrl = networkName => `https://sdk-${networkName}.aepps.com`;
const getMiddlewareUrl = networkName => `https://${networkName}.mdw.aepps.com`;
const getExplorerUrl = (networkName = '') => `https://${networkName}${networkName ? '.' : ''}explorer.aepps.com`;

const genNetwork = (name, { pathName = name.toLowerCase(), ...options } = {}) => ({
  name,
  url: getUrl(pathName),
  middlewareUrl: getMiddlewareUrl(pathName),
  explorerUrl: getExplorerUrl(pathName),
  ...options,
});

export const defaultNetwork = genNetwork('Roma-net', {
  pathName: 'mainnet',
  middlewareUrl: getMiddlewareUrl('roma-net'),
  explorerUrl: getExplorerUrl(),
});

export default Object.freeze((process.env.NODE_ENV === 'production' ? [
  defaultNetwork,
  genNetwork('Testnet'),
] : [
  genNetwork('Testnet'),
  defaultNetwork,
  genNetwork('Unstable'),
  genNetwork('Edgenet', pick(defaultNetwork, ['middlewareUrl'])),
]).map(Object.freeze));

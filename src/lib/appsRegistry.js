import blockchainExplorerIcon from '../assets/icons/aepps/blockchain-explorer.svg';
import tokenMigrationIcon from '../assets/icons/aepps/token-migration.jpg';

export { default as DEFAULT_ICON } from '../assets/icons/aepps/default.svg';

export const aeternityApps = [{
  name: 'Blockchain Explorer',
  description: 'Verify interactions in real-time. Search the æternity network by address, block or transaction.',
  path: 'explorer.aepps.com',
  icon: blockchainExplorerIcon,
}, {
  name: 'Token Migration',
  description: 'AE token migration to the æternity Mainnet is ongoing. If you still haven\'t transfered your Ethereum AE tokens, you can do it using this app.',
  path: 'token-migration.aepps.com',
  icon: tokenMigrationIcon,
}, ...process.env.NODE_ENV === 'production' ? [] : [{
  name: 'Example æpp',
  description: 'Based on the example from JS SDK.',
  path: 'example-aepp.origin.aepps.com',
  icon: blockchainExplorerIcon,
}]];

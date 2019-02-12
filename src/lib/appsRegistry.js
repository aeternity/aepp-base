import transferIcon from '../assets/icons/aepps/transfer.svg';
import settingsIcon from '../assets/icons/aepps/settings.svg';
import addressesIcon from '../assets/icons/aepps/addresses.svg';
import blockchainExplorerIcon from '../assets/icons/aepps/blockchain-explorer.svg';
import tokenMigrationIcon from '../assets/icons/aepps/token-migration.svg';

export { default as DEFAULT_ICON } from '../assets/icons/aepps/blockchain-explorer.svg';

export const appsRegistry = {
  2: {
    name: 'Transfer',
    icon: transferIcon,
    path: 'transfer',
  },
  4: {
    name: 'Settings',
    icon: settingsIcon,
    path: 'settings',
    unremovable: true,
  },
  5: {
    name: 'Addresses',
    icon: addressesIcon,
    iconFullSize: true,
    path: 'addresses',
  },
};

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
}];

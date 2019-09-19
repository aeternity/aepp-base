import blockchainExplorerIcon from '../assets/icons/aepps/blockchain-explorer.svg';
import tokenMigrationIcon from '../assets/icons/aepps/token-migration.jpg';
import graffitiAeppIcon from '../assets/icons/aepps/graffiti-aepp.svg';

export { default as DEFAULT_ICON } from '../assets/icons/aepps/default.svg';

const showGraffitiApp = new Date('2019-09-04T22:00:00.000Z').getTime() <= Date.now();
const showPaymentApp = new Date('2019-09-24T22:00:00.000Z').getTime() >= Date.now();

export const aeternityApps = [...showGraffitiApp ? [{
  name: 'Graffiti',
  path: 'graffiti.aeternity.com',
  icon: graffitiAeppIcon,
}] : [], ...showPaymentApp ? [{
  name: 'Pæy.me Customer',
  path: 'customer.aehub.coinfabrik.com',
  icon: blockchainExplorerIcon,
}, {
  name: 'Pæy.me Merchant',
  path: 'merchant.aehub.coinfabrik.com',
  icon: blockchainExplorerIcon,
}] : [], {
  name: 'æternity Voting',
  path: 'aeternity.com/aepp-hybrid-voting',
  icon: blockchainExplorerIcon,
}, {
  name: 'Token Migration',
  path: 'token-migration.aepps.com',
  icon: tokenMigrationIcon,
}, ...process.env.NODE_ENV === 'production' ? [] : [{
  name: 'Example æpp',
  path: 'example-aepp.origin.aepps.com',
  icon: blockchainExplorerIcon,
}, {
  name: 'Middleware æpp',
  path: 'mdw.aepps.com',
  icon: blockchainExplorerIcon,
}, {
  name: 'Naming æpp example',
  path: 'aeternity.com/aepp-naming-example',
  icon: blockchainExplorerIcon,
}, {
  name: 'Faucet æpp',
  path: 'faucet.aepps.com',
  icon: blockchainExplorerIcon,
}]];

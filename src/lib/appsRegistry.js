export { default as DEFAULT_ICON } from '../assets/icons/aepps/default.svg';

export const aeternityAppsPaths = [
  'governance.aeternity.com',
  'graffiti.aeternity.com',
  'migrate.aeternity.com',
  ...process.env.NODE_ENV === 'production' ? [] : [
    'example-aepp.origin.aepps.com',
    'mdw.aepps.com',
    'aeternity.com/aepp-naming-example',
    'faucet.aepps.com',
  ],
];

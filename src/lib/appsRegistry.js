export { default as DEFAULT_ICON } from '../assets/icons/aepps/default.svg';

export const aeternityAppsPaths = [
  'graffiti.aeternity.com',
  'aeternity.com/aepp-hybrid-voting',
  'token-migration.aepps.com',
  ...process.env.NODE_ENV === 'production' ? [] : [
    'example-aepp.origin.aepps.com',
    'mdw.aepps.com',
    'aeternity.com/aepp-naming-example',
    'faucet.aepps.com',
  ],
];

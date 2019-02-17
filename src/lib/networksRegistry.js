export default [
  { name: 'Roma-net', url: 'https://sdk-mainnet.aepps.com' },
  { name: 'Testnet', url: 'https://sdk-testnet.aepps.com' },
  { name: 'Edgenet', url: 'https://sdk-edgenet.aepps.com' },
  ...process.env.NODE_ENV === 'production' ? [] : [
    { name: 'Unstable', url: 'https://sdk-unstable.aepps.com' },
  ],
];

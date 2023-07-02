import { AeSdk, Node, MemoryAccount } from '@aeternity/aepp-sdk-next';

// eslint-disable-next-line import/prefer-default-export
export const aeSdk = new AeSdk({
  nodes: [{
    instance: new Node('https://testnet.aeternity.io'),
    name: 'testnet',
  }],
  accounts: [new MemoryAccount('ac64effca070cafbad567315f15f4839545fb606d7346772c1f74fdfb1d5fe89220f99e54be32b9cb83537389cdc8dd695e5f184f0c5a9f4bcd3f2f10e0fe3ab')],
});

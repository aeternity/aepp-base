import { AeSdk, Node, MemoryAccount } from '@aeternity/aepp-sdk';

export const aeSdk = new AeSdk({
  nodes: [
    {
      instance: new Node('http://localhost:3013'),
      name: 'testnet',
    },
  ],
  accounts: [new MemoryAccount('sk_2CuofqWZHrABCrM7GY95YSQn8PyFvKQadnvFnpwhjUnDCFAWmf')],
});

import { AeSdk, Node, MemoryAccount } from '@aeternity/aepp-sdk-next';

// eslint-disable-next-line import/prefer-default-export
export const aeSdk = new AeSdk({
  nodes: [{
    instance: new Node('http://localhost:3013'),
    name: 'testnet',
  }],
  accounts: [new MemoryAccount('9ebd7beda0c79af72a42ece3821a56eff16359b6df376cf049aee995565f022f840c974b97164776454ba119d84edc4d6058a8dec92b6edc578ab2d30b4c4200')],
});

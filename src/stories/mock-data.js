import { times } from 'lodash-es';
import BigNumber from 'bignumber.js';
import { Crypto } from '@aeternity/aepp-sdk';

export const address = 'ak_2swhLkgBPeeADxVTAVCJnZLY5NZtCFiM93JxsEaMuC59euuFRQ';

export const account = {
  balance: BigNumber('14.999999999999813'),
  address,
  name: 'My First Account',
};

export const accounts = times(5, idx => ({
  balance: BigNumber(Math.random() * 20),
  address: Crypto.generateKeyPair().publicKey,
  name: `Test account ${idx}`,
}));

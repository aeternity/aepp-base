#!/usr/bin/env node

import { execSync } from 'child_process';
import {
  Node, AeSdk, MemoryAccount, generateSaveHDWalletFromSeed, getSaveHDWalletAccounts,
  encode, Encoding,
} from '@aeternity/aepp-sdk-next';
import { mnemonicToSeed } from '@aeternity/bip39';

// TODO: remove after merging https://github.com/aeternity/ae_mdw/issues/1758
try {
  execSync(
    'docker compose exec middleware ./bin/ae_mdw rpc ":aeplugin_dev_mode_app.start_unlink()"',
    { stdio : 'pipe' },
  );
} catch (error) {
  if (!error.message.includes('{:error, {:already_started')) throw error;
}

await (async function rollbackToFirstBlock() {
  const { status } = await fetch('http://localhost:3313/rollback?height=1');
  if (status !== 200) throw new Error(`Unexpected status code: ${status}`);
})();

const aeSdk = new AeSdk({
  nodes: [{ name: 'testnet', instance: new Node('http://localhost:3013') }],
  accounts: [
    new MemoryAccount('9ebd7beda0c79af72a42ece3821a56eff16359b6df376cf049aee995565f022f840c974b97164776454ba119d84edc4d6058a8dec92b6edc578ab2d30b4c4200'),
  ],
});

const seed = mnemonicToSeed('cross cat upper state flame wire inner betray almost party agree endorse');
const wallet = generateSaveHDWalletFromSeed(seed, '');
const [{ secretKey }, { secretKey: secretKey2 }] = getSaveHDWalletAccounts(wallet, '', 2);
const account1 = new MemoryAccount(secretKey);
const account2 = new MemoryAccount(secretKey2);

await aeSdk.spend(200e18, account1.address);
await aeSdk.spend(100e18, account2.address);
console.log('Wallet 1 ready');

await (async function prepareTransactionHistory() {
  for (let i = 0; i < 15; i += 1) {
    await aeSdk.spend(0.0001e18, aeSdk.address, { onAccount: account1 });
  }
  console.log('Transaction history ready');
})();

await (async function prepareNames() {
  await aeSdk.aensClaim('engine.chain', 0);
  await aeSdk.aensBid('engine.chain', 60e18, { onAccount: account1 });
  await aeSdk.aensBid('engine.chain', 65e18);
  await aeSdk.aensClaim('visual.chain', 0);
  await aeSdk.aensBid('visual.chain', 60e18, { onAccount: account1 });
  await aeSdk.aensClaim('inspector.chain', 0);
  await aeSdk.aensClaim('мир.chain', 0);
  await aeSdk.aensClaim('understanding.chain', 0, { onAccount: account1 });
  await aeSdk.aensClaim('entertainment.chain', 0, { onAccount: account2 });
  await aeSdk.aensUpdate('entertainment.chain', {
    'account_pubkey': account2.address,
    'contract_pubkey': account1.address.replace('ak_', 'ct_'),
    'second account': account1.address,
    'raw': encode(Buffer.from('test'), Encoding.Bytearray),
  }, { onAccount: account2 });
  console.log('Names ready');
})();

await (async function wallet2() {
  const seed = mnemonicToSeed('sun dish cousin double youth year path fix away pig spring upset');
  const wallet = generateSaveHDWalletFromSeed(seed, '');
  const [{ secretKey }, { publicKey: publicKey2 }] = getSaveHDWalletAccounts(wallet, '', 2);
  const acc = new MemoryAccount(secretKey);
  await aeSdk.spend(100e18, acc.address);
  await aeSdk.spend(100e18, publicKey2);
  await aeSdk.aensClaim('investigation.chain', 0, { onAccount: acc });
  console.log('Wallet 2 ready');
})();

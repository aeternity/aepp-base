#!/usr/bin/env node

import { execSync } from 'child_process';
import {
  Node,
  AeSdk,
  MemoryAccount,
  AccountMnemonicFactory,
  encode,
  Encoding,
  Name,
} from '@aeternity/aepp-sdk-next';

// TODO: remove after merging https://github.com/aeternity/ae_mdw/issues/1758
try {
  execSync(
    'docker compose exec middleware ./bin/ae_mdw rpc ":aeplugin_dev_mode_app.start_unlink()"',
    { stdio: 'pipe' },
  );
} catch (error) {
  if (!error.message.includes('{:error, {:already_started')) throw error;
}

await (async function rollbackToFirstBlock() {
  const { status } = await fetch('http://localhost:3313/rollback?height=1');
  if (status !== 200) throw new Error(`Unexpected status code: ${status}`);
})();

const onNode = new Node('http://localhost:3013');
const aeSdk = new AeSdk({
  nodes: [{ name: 'testnet', instance: onNode }],
  accounts: [new MemoryAccount('sk_2CuofqWZHrABCrM7GY95YSQn8PyFvKQadnvFnpwhjUnDCFAWmf')],
});

const factory = new AccountMnemonicFactory(
  'cross cat upper state flame wire inner betray almost party agree endorse',
);
const account1 = await factory.initialize(0);
const account2 = await factory.initialize(1);

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
  const engine = new Name('engine.chain', aeSdk.getContext());
  await engine.claim();
  await engine.bid(60e18, { onAccount: account1 });
  await engine.bid(65e18);

  const visual = new Name('visual.chain', aeSdk.getContext());
  await visual.claim();
  await visual.bid(60e18, { onAccount: account1 });

  await new Name('inspector.chain', aeSdk.getContext()).claim();

  await new Name('мир.chain', aeSdk.getContext()).claim();

  await new Name('understanding.chain', { onNode, onAccount: account1 }).claim();

  const entertainment = new Name('entertainment.chain', { onNode, onAccount: account2 });
  await entertainment.claim();
  await entertainment.update({
    account_pubkey: account2.address,
    contract_pubkey: account1.address.replace('ak_', 'ct_'),
    'second account': account1.address,
    raw: encode(Buffer.from('test'), Encoding.Bytearray),
  });
  console.log('Names ready');
})();

await (async function wallet2() {
  const factory = new AccountMnemonicFactory(
    'sun dish cousin double youth year path fix away pig spring upset',
  );
  const acc1 = await factory.initialize(0);
  const acc2 = await factory.initialize(1);
  await aeSdk.spend(100e18, acc1.address);
  await aeSdk.spend(100e18, acc2.address);
  await new Name('investigation.chain', { onNode, onAccount: acc1 }).claim();
  console.log('Wallet 2 ready');
})();

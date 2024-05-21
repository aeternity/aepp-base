#!/usr/bin/env node

import { execSync } from 'child_process';
import {
  Node, AeSdk, MemoryAccount, generateSaveHDWalletFromSeed, getSaveHDWalletAccounts,
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
const [{ publicKey, secretKey }] = getSaveHDWalletAccounts(wallet, '', 1);

await aeSdk.spend(1e20, publicKey);

await (async function prepareTransactionHistory() {
  const onAccount = new MemoryAccount(secretKey);
  for (let i = 0; i < 15; i += 1) {
    await aeSdk.spend(1e14, aeSdk.address, { onAccount });
  }
})();

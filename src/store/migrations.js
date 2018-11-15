/* eslint-disable no-alert */

import AES from '../lib/aes';
import { derivePasswordKey } from './utils';

const migrations = [{
  name: 'Fix AES-CTR counter issue',
  async apply(store, getState, setState) {
    if (!getState().mobile) {
      setState({ ...getState(), version: 1 });
      console.log('Migrated successfully');
      return;
    }

    const moduleName = 'migration-fix-aes-ctr-counter-issue';
    store.registerModule(moduleName, {
      actions: {
        async unlockKeystore({ commit, rootState: { mobile: { keystore } } }, password) {
          const passwordDerivedKey = await derivePasswordKey(password, keystore.salt);
          const mac = new Uint8Array(await new AES(passwordDerivedKey).decrypt(keystore.mac));
          if (mac.reduce((p, n) => p || n !== 0, false)) return;

          const [chainCode, privateKey] = await Promise.all([
            keystore.chainCode, keystore.privateKey,
          ].map(data => new AES(passwordDerivedKey).decrypt(data)));

          const aes = new AES(passwordDerivedKey);
          const encryptedHdWallet = {
            privateKey: await aes.encrypt(privateKey),
            chainCode: await aes.encrypt(chainCode),
            mac: await aes.encrypt(new Uint8Array(2)),
            salt: keystore.salt,
          };
          commit('setKeystore', encryptedHdWallet);
          commit('setDerivedKey', passwordDerivedKey);

          commit('setVersion', 1);
          commit('setNotification'); // hide "You've entered a wrong password" notification
          store.unregisterModule(moduleName);
          console.log('Migrated successfully');
        },
      },
    });
  },
}];

const LATEST_VERSION = migrations.length;

export default async (store, getState, setState) => {
  const state = getState();
  if (!state) {
    setState({ version: LATEST_VERSION });
    return;
  }
  const version = state.version || 0;
  await migrations.slice(version).reduce((p, f, idx) => p.then(async () => {
    console.log(`Migration to version #${idx + 1} (${f.name})`);
    await f.apply(store, getState, setState);
  }), Promise.resolve());
};

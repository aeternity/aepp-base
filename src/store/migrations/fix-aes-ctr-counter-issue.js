import { derivePasswordKey } from '../utils';
import AES from '../../lib/aes';

export default {
  migrate(state, store) {
    if (!process.env.IS_MOBILE_DEVICE) return undefined;

    const moduleName = 'migration-fix-aes-ctr-counter-issue';
    return new Promise(resolve => store.registerModule(moduleName, {
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

          commit('setNotification'); // hide "You've entered a wrong password" notification
          store.unregisterModule(moduleName);
          resolve();
        },
      },
    }));
  },
};

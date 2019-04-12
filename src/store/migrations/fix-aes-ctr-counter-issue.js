import { derivePasswordKey } from '../utils';
import AES from '../../lib/aes';

export default {
  migrate(state, store) {
    if (!process.env.IS_MOBILE_DEVICE) return state;

    const moduleName = 'migration-fix-aes-ctr-counter-issue';
    return new Promise(resolve => store.registerModule(moduleName, {
      actions: {
        async unlockHdWallet({ commit, rootState: { mobile: { encryptedHdWallet } } }, password) {
          const passwordDerivedKey = await derivePasswordKey(password, encryptedHdWallet.salt);
          const mac = new Uint8Array(
            await new AES(passwordDerivedKey).decrypt(encryptedHdWallet.mac),
          );
          if (mac.reduce((p, n) => p || n !== 0, false)) return;

          const [chainCode, privateKey] = await Promise.all([
            encryptedHdWallet.chainCode, encryptedHdWallet.privateKey,
          ].map(data => new AES(passwordDerivedKey).decrypt(data)));

          const aes = new AES(passwordDerivedKey);
          const reEncryptedHdWallet = {
            privateKey: await aes.encrypt(privateKey),
            chainCode: await aes.encrypt(chainCode),
            mac: await aes.encrypt(new Uint8Array(2)),
            salt: encryptedHdWallet.salt,
          };
          commit('setEncryptedHdWallet', reEncryptedHdWallet);
          commit('setHdWallet', { privateKey, chainCode });

          commit('setNotification'); // hide "You've entered a wrong password" notification
          store.unregisterModule(moduleName);
          resolve();
        },
      },
    }));
  },
};

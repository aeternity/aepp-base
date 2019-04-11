import { getHDWalletAccounts } from '@aeternity/hd-wallet/src';
import AES from '../../lib/aes';

export default store => store.watch(
  ({ mobile: { keystore, accountCount, derivedKey } }) => [keystore, accountCount, derivedKey],
  async ([keystore, accountCount, derivedKey]) => {
    if (!keystore || !derivedKey) {
      store.commit('setAccounts', []);
      return;
    }
    const aes = new AES(derivedKey);
    const wallet = {
      privateKey: await aes.decrypt(keystore.privateKey),
      chainCode: await aes.decrypt(keystore.chainCode),
    };
    store.commit('setAccounts', getHDWalletAccounts(wallet, accountCount));
  },
  { immediate: true },
);

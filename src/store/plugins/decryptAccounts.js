import { getHDWalletAccounts } from '@aeternity/hd-wallet/src'
import AES from '../../lib/aes'

export default store =>
  store.watch(
    ({ mobile: { masterKey, keystore, accountCount, derivedKey } }) => [masterKey, keystore, accountCount, derivedKey],
    async ([masterKey, keystore, accountCount, derivedKey]) => {
      if (!keystore || !derivedKey) {
        store.commit('setAccounts', getHDWalletAccounts(masterKey, accountCount))
        return
      }
      const aes = new AES(derivedKey)
      const wallet = {
        privateKey: await aes.decrypt(keystore.privateKey),
        chainCode: await aes.decrypt(keystore.chainCode)
      }
      store.commit('setAccounts', getHDWalletAccounts(wallet, accountCount))
    },
    { immediate: true })

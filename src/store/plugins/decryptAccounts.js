import { getHDWalletAccounts } from '@aeternity/hd-wallet'
import IS_MOBILE_DEVICE from '../../lib/isMobileDevice'
import AES from '../../lib/aes'

export default store =>
  IS_MOBILE_DEVICE && store.watch(
    ({ mobile: { keystore, accountCount, derivedKey } }) => [keystore, accountCount, derivedKey],
    async ([keystore, accountCount, derivedKey]) => {
      if (!keystore || !derivedKey) return
      const aes = new AES(derivedKey)
      const wallet = {
        privateKey: await aes.decrypt(keystore.privateKey),
        chainCode: await aes.decrypt(keystore.chainCode)
      }
      store.commit('setAccounts', getHDWalletAccounts(wallet, accountCount))
    },
    { immediate: true })

export default async (store) => {
  if (
    !store.state.accounts.hdWallet.encryptedWallet
    || store.getters['accounts/hdWallet/isWalletEncrypted']
  ) return;
  await store.dispatch('accounts/hdWallet/unlockWallet');
};

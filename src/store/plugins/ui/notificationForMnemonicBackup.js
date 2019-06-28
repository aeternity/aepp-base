export default (store) => {
  store.subscribeAction(({ type }) => {
    if (
      type !== 'accounts/hdWallet/unlockWallet'
      || store.state.accounts.hdWallet.mnemonicBackedUp
    ) return;
    const unwatch = store.watch(
      (state, { loggedIn }) => loggedIn,
      () => {
        store.dispatch('modals/open', { name: 'notificationMnemonicBackup' });
        unwatch();
      },
    );
  });
};

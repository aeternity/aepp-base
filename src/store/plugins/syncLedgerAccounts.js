export default (store) => {
  let ledgerAccounts;
  store.subscribe(({ type, payload }) => {
    switch (type) {
      case 'setRemoteConnected':
        if (!payload) return;
        ledgerAccounts = store.state.accounts.list
          .filter(({ source }) => source.type === 'ledger');
        break;
      case 'syncState':
        if (!ledgerAccounts) return;
        ledgerAccounts.forEach(({ address, name, source }) => {
          if (store.state.accounts.list.some(account => account.address === address)) return;
          store.commit('accounts/add', { ...source, address, name });
        });
        ledgerAccounts = null;
        break;
      default:
    }
  });
};

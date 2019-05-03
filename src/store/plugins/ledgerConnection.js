import TransportU2F from '@ledgerhq/hw-transport-u2f';
import Ae from '@aeternity/ledger-app-api';

export default async (store) => {
  const isSupported = await TransportU2F.isSupported();
  store.commit('setLedgerSupported', isSupported);
  if (!isSupported) return;

  if (!store.state.accounts.list.some(({ source: { type } }) => type === 'ledger')) {
    const transport = new TransportU2F();
    const ledgerAppApi = new Ae(transport);
    // eslint-disable-next-line no-await-in-loop
    while (await ledgerAppApi.getAppConfiguration().then(() => false, () => true));
    store.dispatch('accounts/ledger/create');
  }
};

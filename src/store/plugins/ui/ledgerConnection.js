import TransportU2F from '@ledgerhq/hw-transport-u2f';

export default async (store) => {
  const isSupported = await TransportU2F.isSupported();
  store.commit('setLedgerSupported', isSupported);
};

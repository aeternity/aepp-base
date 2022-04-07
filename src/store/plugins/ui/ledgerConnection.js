import TransportWebUSB from '@ledgerhq/hw-transport-webusb';

export default async (store) => {
  const isSupported = await TransportWebUSB.isSupported();
  store.commit('setLedgerSupported', isSupported);
};

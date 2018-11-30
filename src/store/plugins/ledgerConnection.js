import TransportU2F from '@ledgerhq/hw-transport-u2f';
import Ae from '@aeternity/ledger-app-api';
import { Crypto } from '@aeternity/aepp-sdk/es';

export default async (store) => {
  const transport = await new TransportU2F();
  const ae = new Ae(transport);
  // eslint-disable-next-line no-underscore-dangle
  const isTransportLocked = () => transport._appAPIlock;

  let transportUnlockCallback;

  const sign = async (...args) => {
    if (isTransportLocked()) {
      await new Promise((resolve) => {
        transportUnlockCallback = resolve;
      });
      transportUnlockCallback = undefined;
    }
    return ae.signTransaction(...args);
  };

  const open = () => {
    const closeCbs = [];

    closeCbs.push(store.watch(
      ({ desktop: { ledgerAccountNumber } }) => ledgerAccountNumber,
      async (accountNumber) => {
        const addresses = [];
        for (let i = 0; i < accountNumber; i += 1) {
          addresses.push(await ae.getAddress(i)); // eslint-disable-line no-await-in-loop
        }
        store.commit('setLedgerAddresses', addresses);
      },
      { immediate: true },
    ));

    closeCbs.push(store.subscribe(async ({ type, payload }) => {
      switch (type) {
        case 'setTransactionToSign':
          if (!payload) return;
          try {
            const { transaction } = payload.args;
            const binaryTx = await store.dispatch('genSpendTxBinary', transaction);
            const signature = Buffer.from(await sign(
              store.state.desktop.ledgerAddresses.indexOf(transaction.senderId),
              binaryTx,
              store.state.networkId,
            ), 'hex');
            payload.resolve(Crypto.encodeTx(Crypto.prepareTx(signature, binaryTx)));
          } catch (e) {
            payload.reject(e);
          }
          break;
        default:
      }
    }));

    return () => closeCbs.forEach(f => f());
  };

  setInterval(async () => {
    if (isTransportLocked()) return;
    const { exchangeTimeout } = transport;
    transport.setExchangeTimeout(2000);
    let connected;
    try {
      await ae.getAppConfiguration();
      connected = true;
    } catch (e) {
      connected = false;
    }
    transport.setExchangeTimeout(exchangeTimeout);
    if (transportUnlockCallback) transportUnlockCallback();
    if (connected !== store.state.desktop.ledgerConnected) {
      store.commit('setLedgerConnected', connected);
    }
  }, 4000);

  let closeCb;
  store.watch(
    ({ desktop: { ledgerConnected } }) => ledgerConnected,
    (ledgerConnected) => {
      if (ledgerConnected && !closeCb) closeCb = open();
      if (!ledgerConnected && closeCb) {
        closeCb();
        closeCb = undefined;
      }
    },
    { immediate: true },
  );
};

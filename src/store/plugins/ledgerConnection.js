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

  const open = async () => {
    const closeCbs = [];

    const addAddress = async (idx, create = false) => {
      const conformModalPromise = store.dispatch('modals/confirmLedgerAddress', {
        address: await ae.getAddress(idx),
        create,
      });
      let address;
      do {
        // eslint-disable-next-line no-await-in-loop
        address = await ae.getAddress(idx, true).catch(() => {});
      } while (!address);
      conformModalPromise.cancel();
      store.commit('addLedgerAddress', address);
    };

    for (let i = 0; i < store.state.desktop.ledgerAccountNumber; i += 1) {
      await addAddress(i); // eslint-disable-line no-await-in-loop
    }

    closeCbs.push(store.subscribe(async ({ type, payload }) => {
      switch (type) {
        case 'createAccount':
          if (store.state.desktop.ledgerConnected) {
            addAddress(store.state.desktop.ledgerAccountNumber - 1, true);
          }
          break;
        case 'setTransactionToSign': {
          if (!payload) return;
          let conformModalPromise;
          try {
            const { transaction } = payload.args;
            transaction.fee = await store.dispatch('modals/getLedgerTransactionFee');
            conformModalPromise = store.dispatch('modals/confirmLedgerSignTransaction');
            const binaryTx = await store.dispatch('genSpendTxBinary', transaction);
            const signature = Buffer.from(await sign(
              store.state.desktop.ledgerAddresses.indexOf(transaction.senderId),
              binaryTx,
              store.state.sdk.nodeNetworkId,
            ), 'hex');
            payload.resolve(Crypto.encodeTx(Crypto.prepareTx(signature, binaryTx)));
          } catch (e) {
            payload.reject(e);
          } finally {
            if (conformModalPromise) conformModalPromise.cancel();
          }
          break;
        }
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
    async (ledgerConnected) => {
      if (ledgerConnected && !closeCb) closeCb = await open();
      if (!ledgerConnected && closeCb) {
        closeCb();
        closeCb = undefined;
      }
    },
    { immediate: true },
  );
};

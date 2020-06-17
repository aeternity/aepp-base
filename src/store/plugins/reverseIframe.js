import Promise from 'bluebird';
import { BrowserWindowMessageConnection } from '@aeternity/aepp-sdk/es/utils/aepp-wallet-communication/connection/browser-window-message';

const modals = {
  confirmAccountAccess: true,
  confirmTransactionSign: true,
  confirmSign: true,
};

export default (store) => {
  if (!process.env.RUNNING_IN_FRAME) return;
  const unsubscribe = store.watch(
    ({ sdk }, getters) => [sdk && !sdk.then && getters['accounts/active'], sdk],
    ([ready, sdk]) => {
      if (!ready) return;
      const connection = BrowserWindowMessageConnection({ target: window.parent });
      sdk.addRpcClient(connection);
      sdk.shareWalletInfo(connection.sendMessage.bind(connection));
      window.parent.postMessage({ jsonrpc: '2.0', method: 'ready' }, '*');
      unsubscribe();
    },
  );

  store.registerModule('modals', {
    namespaced: true,
    actions: {
      open(_, { name, ...props }) {
        if (!modals[name]) return Promise.reject(new Error(`Modal with name "${name}" not registered`));
        const popupWindow = window.open('/', 'popup', 'width=530,height=730');
        if (!popupWindow) return Promise.reject(new Error('Can\'t show popup window'));
        popupWindow.modalName = name;
        return new Promise((resolve, reject) => {
          popupWindow.modalProps = { ...props, resolve, reject };
        });
      },
    },
  });
};

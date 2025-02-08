import BrowserWindowMessageConnection from '@aeternity/aepp-sdk/es/utils/aepp-wallet-communication/connection/browser-window-message';
import { RUNNING_IN_FRAME } from '../../lib/constants';

const modals = {
  confirmAccountAccess: true,
  confirmTransactionSign: true,
  confirmSign: true,
};

export default (store) => {
  if (!RUNNING_IN_FRAME) return;
  const unsubscribe = store.watch(
    ({ sdk }, getters) => [sdk && !sdk.then && getters['accounts/active'], sdk],
    ([ready, sdk]) => {
      if (!ready) return;
      const connection = BrowserWindowMessageConnection({ target: window.parent });
      sdk.addRpcClient(connection);
      sdk.shareWalletInfo(connection.sendMessage.bind(connection));
      unsubscribe();
    },
  );

  store.registerModule('modals', {
    namespaced: true,
    actions: {
      open(_, { name, ...props }) {
        if (!modals[name]) throw new Error(`Modal with name "${name}" not registered`);
        const popupWindow = window.open('/', 'popup', 'width=530,height=730');
        if (!popupWindow) throw new Error('Can\'t show popup window');
        popupWindow.modalName = name;
        return new Promise((resolve, reject) => {
          popupWindow.modalProps = { ...props, resolve, reject };
        });
      },
    },
  });
};

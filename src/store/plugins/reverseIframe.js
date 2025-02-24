import { defer } from 'lodash-es';
import sdkWallet from '../../lib/sdkWallet';
import { RUNNING_IN_FRAME } from '../../lib/constants';

const modals = {
  confirmAccountAccess: true,
  confirmTransactionSign: true,
  confirmSign: true,
};

export default async (store) => {
  if (!RUNNING_IN_FRAME) return;

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

  await new Promise((resolve) => {
    const unsubscribe = store.watch(
      (_store, getters) => getters['accounts/active'],
      async (ready) => {
        if (!ready) return;
        await new Promise((resolve) => defer(resolve));
        unsubscribe();
        resolve();
      },
      { immediate: true },
    );
  });

  sdkWallet(store, window.parent);
};

import Promise from 'bluebird';

const modals = {
  confirmAccountAccess: true,
};

export default (store) => {
  if (!process.env.RUNNING_IN_FRAME) return;
  const unsubscribe = store.watch(
    ({ sdk }, getters) => sdk && getters['accounts/active'],
    (ready) => {
      if (!ready) return;
      window.parent.postMessage({ jsonrpc: '2.0', method: 'ready' }, '*');
      unsubscribe();
    },
  );

  store.registerModule('modals', {
    namespaced: true,
    actions: {
      open(_, { name, ...props }) {
        if (!modals[name]) return Promise.reject(new Error(`Modal with name "${name}" not registered`));
        return new Promise((resolve, reject) => {
          const popupWindow = window.open('/', 'popup', 'width=330,height=480');
          popupWindow.props = { ...props, resolve, reject };
        });
      },
    },
  });
};

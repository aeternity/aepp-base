export default (store) => {
  if (!process.env.RUNNING_IN_FRAME) return;
  const unsubscribe = store.watch(
    ({ sdk }, { activeAccount }) => sdk && activeAccount,
    (ready) => {
      if (!ready) return;
      window.parent.postMessage({ jsonrpc: '2.0', method: 'ready' }, '*');
      unsubscribe();
    },
  );
};

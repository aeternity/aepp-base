export default (store) => {
  let interval;
  store.watch(
    (state, { activeIdentity }) => activeIdentity && activeIdentity.address,
    (address) => {
      clearInterval(interval);
      if (!address) return;
      const updateBalance = () => store.dispatch('updateBalance', address);
      updateBalance();
      interval = setInterval(updateBalance, 3000);
    },
    { immediate: true },
  );
};

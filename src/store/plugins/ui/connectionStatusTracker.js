export default (store) => {
  const connectionStatusHandler = () => {
    if (store.state.onLine !== navigator.onLine) store.commit('setOnLine', navigator.onLine);
  };

  window.addEventListener('online', connectionStatusHandler);
  window.addEventListener('offline', connectionStatusHandler);
};

import store from '../store';

// eslint-disable-next-line import/prefer-default-export
export const ensureLoggedIn = (to, from, next) => {
  if (!store.getters.loggedIn) {
    store.commit('setLoginTarget', to.fullPath);
    if (process.env.IS_MOBILE_DEVICE) {
      next({ name: store.state.accounts.hdWallet.encryptedWallet ? 'login' : 'intro' });
    } else {
      if (from.name) next(false);
      else next({ name: 'apps' });
      store.commit('toggleSidebar');
    }
    return;
  }
  next();
};

export const mergeEnterHandlers = (...handlers) => (to, from, next) => next(
  handlers.reduce((nextRoute, handler) => {
    if (nextRoute) return nextRoute;
    let res;
    handler(to, from, (r) => { res = r; });
    return res;
  }, undefined),
);

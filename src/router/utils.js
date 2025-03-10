import store from '../store';

export const ensureLoggedIn = (to, from, next) => {
  if (!store.getters.loggedIn) {
    store.commit('setLoginTarget', to.fullPath);
    if (ENV_MOBILE_DEVICE) {
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

export const mergeEnterHandlers =
  (...handlers) =>
  (to, from, next) =>
    next(
      handlers.reduce((nextRoute, handler) => {
        if (nextRoute) return nextRoute;
        let res;
        handler(to, from, (r) => {
          res = r;
        });
        return res;
      }, undefined),
    );

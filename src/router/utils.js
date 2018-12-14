import store from '../store';

// eslint-disable-next-line import/prefer-default-export
export const checkLoggedIn = requireLoggedIn => (to, from, next) => {
  if (!store.getters.loggedIn) {
    if (process.env.IS_MOBILE_DEVICE) {
      store.commit('setLoginTarget', to.fullPath);
      next({ name: store.state.mobile.keystore ? 'login' : 'intro' });
      return;
    } if (requireLoggedIn) {
      store.commit('setLoginTarget', to.fullPath);
      if (from.name) next(false);
      else next({ name: 'apps' });
      store.commit('toggleSidebar');
      return;
    }
  }
  next();
};

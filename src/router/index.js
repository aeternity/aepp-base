import Router from 'vue-router';
import { IS_PWA, ROUTE_MOBILE_LOGGED_IN } from '../lib/constants';
import store from '../store';

store.subscribe((mutation, state) => {
  switch (mutation.type) {
    case 'toggleSidebar':
      if (!state.desktop.showSidebar) store.commit('setLoginTarget');
      break;
    default:
  }
});

export default (async () => {
  const router = new Router({
    mode: process.env.VUE_APP_CORDOVA ? 'hash' : 'history',
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      }
      return { x: 0, y: 0 };
    },
    routes: (
      await Promise.all([
        import(/* webpackChunkName: "ui-common" */ './routes/common'),
        ENV_MOBILE_DEVICE
          ? import(/* webpackChunkName: "ui-mobile" */ './routes/mobile')
          : import(/* webpackChunkName: "ui-desktop" */ './routes/desktop'),
      ])
    ).reduce((p, module) => [...p, ...module.default], []),
  });

  if (
    ENV_MOBILE_DEVICE &&
    !process.env.VUE_APP_CORDOVA &&
    !IS_PWA &&
    !store.state.mobile.skipAddingToHomeScreen
  )
    await router.replace({ name: 'add-to-home-screen' });

  if (process.env.VUE_APP_CORDOVA) {
    document.addEventListener('deviceready', () =>
      window.IonicDeeplink.onDeepLink((d) =>
        router.push(((u) => u.pathname + u.search)(new URL(d.url))),
      ),
    );
  }

  store.watch(
    (state, { loggedIn }) => loggedIn,
    (loggedIn) => {
      if (loggedIn) {
        if (ENV_MOBILE_DEVICE || store.state.loginTarget) {
          router.push(store.state.loginTarget || ROUTE_MOBILE_LOGGED_IN);
          store.commit('setLoginTarget');
        }
      } else if (!ENV_MOBILE_DEVICE) {
        router.replace({ name: 'apps' });
      }
    },
  );

  return router;
})();

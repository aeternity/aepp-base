import Router from 'vue-router';
import { ROUTE_MOBILE_LOGGED_IN } from '../lib/constants';
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
    mode: process.env.IS_CORDOVA ? 'hash' : 'history',
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      }
      return { x: 0, y: 0 };
    },
    routes: (await Promise.all([
      process.env.IS_MOBILE_DEVICE
        ? import(/* webpackChunkName: "ui-mobile" */ './routes/mobile')
        : import(/* webpackChunkName: "ui-desktop" */ './routes/desktop'),
    ])).reduce((p, module) => [...p, ...module.default], []),
  });

  if (
    process.env.IS_MOBILE_DEVICE && !process.env.IS_CORDOVA
    && !process.env.IS_PWA && !process.env.IS_IOS
    && !store.state.mobile.skipAddingToHomeScreen
  ) await router.replace({ name: 'add-to-home-screen' });

  if (process.env.IS_CORDOVA) {
    window.IonicDeeplink.onDeepLink(
      d => router.push((u => u.pathname + u.search)(new URL(d.url))),
    );
  }

  store.watch(
    (state, { loggedIn }) => loggedIn,
    (loggedIn) => {
      if (loggedIn) {
        if (process.env.IS_MOBILE_DEVICE || store.state.loginTarget) {
          router.push(store.state.loginTarget || ROUTE_MOBILE_LOGGED_IN);
          store.commit('setLoginTarget');
        }
      } else {
        const { fullPath } = router.currentRoute;
        router.replace({ name: process.env.IS_MOBILE_DEVICE ? 'intro' : 'apps' });
        router.replace(fullPath);
      }
    },
  );

  return router;
})();

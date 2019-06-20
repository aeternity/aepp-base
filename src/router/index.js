import Router from 'vue-router';
import store from '../store';
import AddToHomeScreenPrompt from '../pages/mobile/AddToHomeScreenPrompt.vue';

const router = new Router({
  mode: process.env.IS_CORDOVA ? 'hash' : 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

if (
  process.env.IS_MOBILE_DEVICE && !process.env.IS_CORDOVA
  && !process.env.IS_PWA && !process.env.IS_IOS
  && process.env.NODE_ENV === 'production'
) {
  router.addRoutes([{
    path: '/',
    component: AddToHomeScreenPrompt,
  }]);
} else {
  (async () => router.addRoutes(
    (await Promise.all([
      process.env.IS_MOBILE_DEVICE
        ? import(/* webpackChunkName: "ui-mobile" */ './routes/mobile')
        : import(/* webpackChunkName: "ui-desktop" */ './routes/desktop'),
      import('./routes/common'),
    ]))
      .map(module => module.default)
      .reduce((p, n) => p.concat(n)),
  ))();
}

store.watch(
  (state, { loggedIn }) => loggedIn,
  (loggedIn) => {
    if (loggedIn) {
      if (process.env.IS_MOBILE_DEVICE || store.state.loginTarget) {
        router.push(store.state.loginTarget || { name: 'transfer' });
        store.commit('setLoginTarget');
      }
    } else {
      const { fullPath } = router.currentRoute;
      router.replace({ name: process.env.IS_MOBILE_DEVICE ? 'intro' : 'apps' });
      router.replace(fullPath);
    }
  },
);

store.subscribe((mutation, state) => {
  switch (mutation.type) {
    case 'toggleSidebar':
      if (!state.desktop.showSidebar) store.commit('setLoginTarget');
      break;
    default:
  }
});

export default router;

import Router from 'vue-router';
import store from '../store';
import mobileRoutes from './routes/mobile';
import desktopRoutes from './routes/desktop';
import commonRoutes from './routes/common';
import AddToHomeScreenPrompt from '../pages/mobile/AddToHomeScreenPrompt.vue';

const router = new Router({
  mode: process.env.IS_CORDOVA ? 'hash' : 'history',
  routes:
    process.env.IS_MOBILE_DEVICE
      ? (!process.env.IS_CORDOVA && !process.env.IS_PWA && !process.env.IS_IOS && process.env.NODE_ENV === 'production'
        && [{
          path: '/',
          component: AddToHomeScreenPrompt,
        }])
        || [...mobileRoutes, ...commonRoutes]
      : [...desktopRoutes, ...commonRoutes],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

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

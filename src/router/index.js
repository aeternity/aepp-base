import Router from 'vue-router';
import store from '../store';
import mobileRoutes from './routes/mobile';
import desktopRoutes from './routes/desktop';
import commonRoutes from './routes/common';
import AddToHomeScreenPrompt from '../pages/AddToHomeScreenPrompt.vue';

const router = new Router({
  routes:
    process.env.IS_MOBILE_DEVICE
      ? (!process.env.IS_CORDOVA && !process.env.IS_PWA && !process.env.IS_IOS
        && [{
          path: '/',
          component: AddToHomeScreenPrompt,
        }])
        || [...mobileRoutes, ...commonRoutes]
      : [...desktopRoutes, ...commonRoutes],
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
      store.commit('setLoginTarget', router.currentRoute.fullPath);
      router.push({ name: process.env.IS_MOBILE_DEVICE ? 'intro' : 'transfer' });
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

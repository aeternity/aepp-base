import Router from 'vue-router';
import store from '../store';
import mobileRoutes from './routes/mobile';
import commonRoutes from './routes/common';
import AddToHomeScreenPrompt from '../pages/AddToHomeScreenPrompt.vue';

const router = new Router();

if (
  process.env.IS_MOBILE_DEVICE &&
  !process.env.IS_CORDOVA && !process.env.IS_PWA && !process.env.IS_IOS
) {
  router.addRoutes([{
    path: '/',
    component: AddToHomeScreenPrompt,
  }]);
}

if (
  process.env.IS_MOBILE_DEVICE &&
  (process.env.IS_CORDOVA || process.env.IS_PWA || process.env.IS_IOS)
) {
  router.addRoutes(mobileRoutes);
}

if (!process.env.IS_MOBILE_DEVICE || process.env.IS_CORDOVA || process.env.IS_PWA) {
  router.addRoutes(commonRoutes);
}

store.watch(
  (state, { loggedIn }) => loggedIn,
  (loggedIn) => {
    if (loggedIn) {
      if (process.env.IS_MOBILE_DEVICE || store.state.loginTarget) {
        router.push(store.state.loginTarget || { name: 'apps' });
        store.commit('setLoginTarget');
      }
    } else {
      store.commit('setLoginTarget', router.currentRoute.fullPath);
      router.push({ name: process.env.IS_MOBILE_DEVICE ? 'intro' : 'apps' });
    }
  },
);

store.subscribe((mutation, state) => {
  switch (mutation.type) {
    case 'toggleRemoteConnectionPrompt':
      if (!state.desktop.showRemoteConnectionPrompt) store.commit('setLoginTarget');
      break;
    default:
  }
});

export default router;

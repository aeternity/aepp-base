import Vue from 'vue';
import Router from 'vue-router';
import './ui-common';
import registerModals from './router/modals';
import sync from './lib/vuexRouterSync';
import routerPromise from './router';
import store from './store';
import uiPlugin from './store/plugins/ui';
import { i18n } from './store/plugins/ui/languages';

const AppMobile = () => import(/* webpackChunkName: "ui-mobile" */ './App.vue');
const AppDesktop = () => import(/* webpackChunkName: "ui-desktop" */ './AppDesktop.vue');

Vue.use(Router);

(async () => {
  const [router] = await Promise.all([routerPromise, registerModals()]);
  sync(store, router);

  new Vue({
    store,
    router,
    i18n,
    render: (h) => h(process.env.IS_MOBILE_DEVICE ? AppMobile : AppDesktop),
  }).$mount('#app');

  uiPlugin(store);
})().catch((error) => {
  window.onerror(error.message, error.fileName, error.lineNumber, undefined, error);
});

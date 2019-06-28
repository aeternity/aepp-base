import Vue from 'vue';
import Router from 'vue-router';
import './ui-common';
import registerModals from './router/modals';
import sync from './lib/vuexRouterSync';
import VeeValidate from './lib/veeValidatePlugin';
import routerPromise from './router';
import store from './store';
import uiPlugin from './store/plugins/ui';

const AppMobile = () => import(/* webpackChunkName: "ui-mobile" */ './App.vue');
const AppDesktop = () => import(/* webpackChunkName: "ui-desktop" */ './AppDesktop.vue');

Vue.use(Router);
Vue.use(VeeValidate);

import(/* webpackChunkName: "analytics" */ './setupAnalytics').then(module => module.default());

(async () => {
  const [router] = await Promise.all([routerPromise, registerModals()]);
  sync(store, router);

  new Vue({
    store,
    router,
    render: h => h(process.env.IS_MOBILE_DEVICE ? AppMobile : AppDesktop),
  }).$mount('#app');

  uiPlugin(store);
})();

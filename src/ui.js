import Vue from 'vue';
import Router from 'vue-router';
import Matomo from 'vue-matomo';
import './ui-common';
import './register-modals';
import sync from './lib/vuexRouterSync';
import VeeValidate from './lib/veeValidatePlugin';
import App from './App.vue';
import AppDesktop from './AppDesktop.vue';
import router from './router';
import store from './store';
import uiPlugin from './store/plugins/ui';

Vue.use(Router);
Vue.use(VeeValidate);
Vue.use(Matomo, {
  host: process.env.VUE_APP_MATOMO_URL,
  siteId: process.env.VUE_APP_MATOMO_SITE_ID,
  router,
});

sync(store, router);
uiPlugin(store);

new Vue({
  store,
  router,
  render: h => h(process.env.IS_MOBILE_DEVICE ? App : AppDesktop),
}).$mount('#app');

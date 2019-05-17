import Vue from 'vue';
import Router from 'vue-router';
import Matomo from 'vue-matomo';
import Countly from 'countly-sdk-web';
import { defer } from 'lodash-es';
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

Countly.init({
  url: process.env.VUE_APP_COUNTLY_URL,
  app_key: process.env.VUE_APP_COUNTLY_APP_KEY,
});
Countly.q.push(['track_sessions']);
router.afterEach(() => defer(() => Countly.q
  .push(['track_pageview', window.location.pathname + window.location.hash])));

sync(store, router);
uiPlugin(store);

new Vue({
  store,
  router,
  render: h => h(process.env.IS_MOBILE_DEVICE ? App : AppDesktop),
}).$mount('#app');

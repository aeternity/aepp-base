import Vue from 'vue';
import Router from 'vue-router';
import 'normalize.css';
import '@aeternity/aepp-components-3/dist/aepp.components.css';
import 'focus-visible';
import sync from './lib/vuexRouterSync';
import './styles/fullscreen-message.scss';
import './lib/switchWebmanifest';
import './register-modals';
import VeeValidate from './lib/veeValidatePlugin';
import App from './App.vue';
import AppDesktop from './AppDesktop.vue';
import router from './router';
import store from './store';
import uiPlugin from './store/plugins/ui';

Vue.use(Router);
Vue.use(VeeValidate);

Vue.prototype.$globals = {
  IS_MOBILE_DEVICE: process.env.IS_MOBILE_DEVICE,
  IS_IOS: process.env.IS_IOS,
  UNFINISHED_FEATURES: process.env.UNFINISHED_FEATURES,
};

sync(store, router);
uiPlugin(store);

new Vue({
  store,
  router,
  render: h => h(process.env.IS_MOBILE_DEVICE ? App : AppDesktop),
}).$mount('#app');

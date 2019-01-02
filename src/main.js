import Vue from 'vue';
import Router from 'vue-router';
import Clipboard from 'v-clipboard';
import '@aeternity/aepp-components-3/dist/aepp.components.css';
import '@aeternity/aepp-components-3/dist/aepp.fonts.css';
import 'focus-visible';
import './lib/initEnv';
import './lib/switchWebmanifest';
import VeeValidate from './lib/veeValidatePlugin';
import App from './App.vue';
import AppDesktop from './AppDesktop.vue';
import router from './router';
import store from './store';

Vue.use(Clipboard);
Vue.use(Router);
Vue.use(VeeValidate);

if (process.env.NODE_ENV === 'development') {
  window.store = store;
}

Vue.config.productionTip = false;
Vue.prototype.$globals = {
  IS_MOBILE_DEVICE: process.env.IS_MOBILE_DEVICE,
};

new Vue({
  store,
  router,
  render: h => h(process.env.IS_MOBILE_DEVICE ? App : AppDesktop),
}).$mount('#app');

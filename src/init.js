import Vue from 'vue';
import Router from 'vue-router';
import VueRx from 'vue-rx';
import 'normalize.css';
import '@aeternity/aepp-components-3/dist/aepp.components.css';
import 'focus-visible';
import './lib/setGlobalPolyfills';
import './lib/initEnv';
import './lib/switchWebmanifest';
import './register-modals';
import VeeValidate from './lib/veeValidatePlugin';

Vue.use(Router);
Vue.use(VueRx);
Vue.use(VeeValidate);

Vue.config.productionTip = false;
Vue.prototype.$globals = {
  IS_MOBILE_DEVICE: process.env.IS_MOBILE_DEVICE,
  IS_IOS: process.env.IS_IOS,
  UNFINISHED_FEATURES: process.env.UNFINISHED_FEATURES,
};

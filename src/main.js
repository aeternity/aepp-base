import Vue from 'vue';
import Router from 'vue-router';
import Clipboard from 'v-clipboard';
import VeeValidate, { Validator } from 'vee-validate';
import { focus } from 'vue-focus';
import '@aeternity/aepp-components-3/dist/aepp.components.css';
import '@aeternity/aepp-components-3/dist/aepp.fonts.css';
import 'focus-visible';
import BigNumber from 'bignumber.js';
import './lib/initEnv';
import './lib/switchWebmanifest';
import { toUrl } from './lib/utils';
import App from './App.vue';
import AppDesktop from './AppDesktop.vue';
import router from './router';
import store from './store';

Validator.extend('min_value_exclusive', (value, [min]) => BigNumber(value).isGreaterThan(min));
Validator.extend('min_value', (value, [max]) => BigNumber(value).isGreaterThanOrEqualTo(max));
Validator.extend('max_value', (value, [max]) => BigNumber(value).isLessThanOrEqualTo(max));
Validator.extend('url_http', (value) => {
  try {
    const url = toUrl(value);
    return ['http:', 'https:'].includes(url.protocol);
  } catch (e) {
    return false;
  }
});

Vue.use(Clipboard);
Vue.use(Router);
Vue.use(VeeValidate, {
  dictionary: {
    en: {
      messages: {
        required: 'This field is required',
        min: (field, [length]) => `This field must be at least ${length} characters`,
        min_value: (field, [min]) => `This field must be ${min} or more`,
        min_value_exclusive: (field, [min]) => `This field must be more than ${min}`,
        max_value: (field, [max]) => `This field must be ${max} or less`,
        not_in: () => 'This field must be a valid value',
        decimal: (field, [decimals = '*'] = []) =>
          `This field must be numeric and may contain ${!decimals || decimals === '*' ? '' : decimals} decimal points`,
        url_http: () => 'This field is not a valid HTTP(S) URL',
        confirmed: () => 'The passwords do not match',
      },
    },
  },
});
Vue.directive('focus', focus);

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

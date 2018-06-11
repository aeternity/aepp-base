// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import VeeValidate, { Validator } from 'vee-validate'
import { focus } from 'vue-focus'
import './lib/initIsMobileDevice'
import store from './store'
import App from './App.vue'
import getRouter from './router/index'
import IS_MOBILE_DEVICE from './lib/isMobileDevice'

Validator.extend('min_value_exclusive', (value, [min]) => Number(value) > min)
Validator.extend('url_http', (value) => {
  try {
    const url = new URL((/^\w+:\//.test(value) ? '' : `http://`) + value)
    return ['http:', 'https:'].includes(url.protocol)
  } catch (e) {
    return false
  }
})

Vue.use(Router)
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
        decimal: () => 'This field must be numeric and may contain decimal points',
        url_http: () => 'This field is not a valid HTTP(S) URL',
        confirmed: () => 'The passwords do not match'
      }
    }
  }
})

Vue.directive('focus', focus)

Vue.config.productionTip = false
Vue.prototype.$globals = { IS_MOBILE_DEVICE }

/**
 * Function generates a vue instance
 * reduces code-duplication due to the
 * secure-storage initialization
 */
const initialize = function (App, {store, getRouter}) {
  // dev mode
  if (process.env.NODE_ENV === 'development') window.store = store

  // mounting
  /* eslint-disable no-new */
  return new Vue({
    components: { App },
    store: store,
    router: getRouter(store),
    render: h => h(App)
  }).$mount('#app')
}

/**
 * First check if the device has loaded everything,
 * in this case is true, then load Vuejs application
 */
document.addEventListener(
  process.env.IS_CORDOVA ? 'deviceready' : 'onload',
  initialize.bind(null, App, { store, getRouter }),
  false
)

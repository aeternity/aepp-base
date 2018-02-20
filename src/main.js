// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import VueClipboard from 'vue-clipboard2'
import VeeValidate, { Validator } from 'vee-validate'
import { focus } from 'vue-focus'
import App from './App.vue'
import getRouter from './router/index'
import store from './store'

Validator.extend('min_value_exclusive', (value, [min]) => Number(value) > min)

Vue.use(Router)
Vue.use(VueClipboard)
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
        url: () => 'This field is not a valid URL'
      }
    }
  }
})
Vue.directive('focus', focus)

console.log('use setRPCUrl(\'http://rpc-endpoint:8545\') to set the identity manager RPC endpoint')
window.setRPCUrl = function (rpcURL = 'https://kovan.infura.io') {
  store.commit('setRPCUrl', rpcURL)
}

Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   console.log(to.name === 'id-manager' && !store.state.unlocked);
//   if(to.name === 'id-manager' && !store.state.unlocked) {
//     console.log(to.name, from.name);
//     next(false)
//     console.log(to.name, from );
//     next({ replace: true, name: 'unlock' })
//   }
// })

/* eslint-disable no-new */
const IdentityApp = Vue.extend({
  render: h => h(App),
  components: { App },
  store,
  router: getRouter(store)
})
const vm = new IdentityApp()
vm.$mount('#app')

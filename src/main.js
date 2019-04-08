import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import './init';
import App from './App.vue';
import AppDesktop from './AppDesktop.vue';
import router from './router';
import store from './store';

sync(store, router);

if (process.env.NODE_ENV === 'development') {
  window.store = store;
}

new Vue({
  store,
  router,
  render: h => h(process.env.IS_MOBILE_DEVICE ? App : AppDesktop),
}).$mount('#app');

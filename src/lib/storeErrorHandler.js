import Vue from 'vue';
import StoreLoadError from '../pages/StoreLoadError.vue';
import { i18n } from '../store/plugins/ui/languages';

window.onerror = function errorHandler() {
  if (document.getElementById('app').innerHTML) {
    window.onerror = null;
    return;
  }

  new Vue({
    i18n,
    render: h => h(StoreLoadError),
  }).$mount('#app');
};

import Vue from 'vue';
import StoreLoadError from '../pages/StoreLoadError.vue';

window.onerror = function errorHandler() {
  if (document.getElementById('app').innerHTML) {
    window.onerror = null;
    return;
  }

  new Vue({ render: h => h(StoreLoadError) }).$mount('#app');
};

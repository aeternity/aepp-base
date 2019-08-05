import Vue from 'vue';

window.onerror = async function errorHandler() {
  if (document.getElementById('app').innerHTML) {
    window.onerror = null;
    return;
  }

  const StoreLoadError = (await import('../pages/StoreLoadError.vue')).default;
  new Vue({
    render: h => h(StoreLoadError),
  }).$mount('#app');
};

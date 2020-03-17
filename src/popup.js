import Vue from 'vue';
import Vuex from 'vuex';
import './ui-common';
import store from './store';
import languages, { i18n } from './store/plugins/ui/languages';
import initSdk from './store/plugins/initSdk';
import names from './store/plugins/ui/names';
import appsMetadata from './store/plugins/ui/appsMetadata';
import ConfirmAccountAccess from './components/ConfirmAccountAccess.vue';

Vue.use(Vuex);

[languages, initSdk, names, appsMetadata].forEach(plugin => plugin(store));

const unloadHandler = () => {
  window.reject(new Error('Rejected by user'));
};

window.addEventListener('beforeunload', unloadHandler);

const closingWrapper = f => (...args) => {
  f(...args);
  window.removeEventListener('beforeunload', unloadHandler);
  window.close();
};

new Vue({
  store,
  i18n,
  render: h => h(
    ConfirmAccountAccess, {
      props: {
        ...window.props,
        resolve: closingWrapper(window.props.resolve),
        reject: closingWrapper(window.props.reject),
      },
    },
  ),
})
  .$mount('#app');

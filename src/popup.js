import Vue from 'vue';
import Vuex from 'vuex';
import './ui-common';
import store from './store';
import ConfirmAccountAccess from './components/ConfirmAccountAccess.vue';

Vue.use(Vuex);

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
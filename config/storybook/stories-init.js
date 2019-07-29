import '../../src/components/icon.scss';
import Vue from 'vue';
import Vuex from 'vuex';
import VueRx from 'vue-rx';

Vue.use(Vuex);
Vue.use(VueRx);
Object.assign(Vue.prototype, {
  $globals: {
    IS_MOBILE_DEVICE: true,
  },
  $i18n: {},
});

Vue.prototype.$i18n = require('../../src/store/plugins/ui/languages').i18n;
require('../../src/store/plugins/ui/veeValidate');

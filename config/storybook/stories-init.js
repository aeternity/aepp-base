import '../../src/store/plugins/ui/veeValidate';
import '../../src/components/icon.scss';
import Vue from 'vue';
import Vuex from 'vuex';
import VueRx from 'vue-rx';

Vue.use(Vuex);
Vue.use(VueRx);
Vue.prototype.$globals = {
  IS_MOBILE_DEVICE: true,
};

import Vue from 'vue';
import 'focus-visible';
import './components/icon.scss';
import { IS_IOS, ROUTE_MOBILE_LOGGED_IN } from './lib/constants';

Vue.prototype.$globals = {
  ENV_MOBILE_DEVICE: ENV_MOBILE_DEVICE, // eslint-disable-line object-shorthand
  IS_IOS,
  VUE_APP_CORDOVA: process.env.VUE_APP_CORDOVA,
  ROUTE_MOBILE_LOGGED_IN,
};

import Vue from 'vue';
import 'normalize.css';
import 'focus-visible';
import './styles/fullscreen-message.scss';
import './components/icon.scss';
import './lib/switchWebmanifest';
import { IS_IOS, DISABLED_BROWSER, ROUTE_MOBILE_LOGGED_IN } from './lib/constants';

Vue.prototype.$globals = {
  ENV_MOBILE_DEVICE: ENV_MOBILE_DEVICE, // eslint-disable-line object-shorthand
  IS_IOS,
  VUE_APP_CORDOVA: process.env.VUE_APP_CORDOVA,
  DISABLED_BROWSER,
  ROUTE_MOBILE_LOGGED_IN,
};

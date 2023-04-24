import Vue from 'vue';
import 'normalize.css';
import 'focus-visible';
import './styles/fullscreen-message.scss';
import './components/icon.scss';
import './lib/switchWebmanifest';
import { ROUTE_MOBILE_LOGGED_IN } from './lib/constants';

Vue.prototype.$globals = {
  IS_MOBILE_DEVICE: process.env.IS_MOBILE_DEVICE,
  IS_IOS: process.env.IS_IOS,
  IS_CORDOVA: process.env.IS_CORDOVA,
  DISABLED_BROWSER: process.env.DISABLED_BROWSER,
  ROUTE_MOBILE_LOGGED_IN,
};

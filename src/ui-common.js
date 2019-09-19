import Vue from 'vue';
import 'normalize.css';
import 'focus-visible';
import './styles/fullscreen-message.scss';
import './components/icon.scss';
import './lib/switchWebmanifest';

Vue.prototype.$globals = {
  IS_MOBILE_DEVICE: process.env.IS_MOBILE_DEVICE,
  IS_IOS: process.env.IS_IOS,
  UNFINISHED_FEATURES: process.env.UNFINISHED_FEATURES,
  IS_CORDOVA: process.env.IS_CORDOVA,
  DISABLED_BROWSER: process.env.DISABLED_BROWSER,
};

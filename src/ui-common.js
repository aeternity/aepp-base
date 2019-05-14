import Vue from 'vue';
import 'normalize.css';
import '@aeternity/aepp-components-3/dist/aepp.components.css';
import 'focus-visible';
import './styles/fullscreen-message.scss';
import './lib/switchWebmanifest';

Vue.prototype.$globals = {
  IS_MOBILE_DEVICE: process.env.IS_MOBILE_DEVICE,
  IS_IOS: process.env.IS_IOS,
  UNFINISHED_FEATURES: process.env.UNFINISHED_FEATURES,
};

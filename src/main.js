import 'normalize.css';
import { t } from './test';
import Vue from 'vue';
import './lib/setGlobalPolyfills';
import store from './store';
import { RUNNING_IN_POPUP, RUNNING_IN_FRAME } from './lib/constants';

Vue.config.productionTip = false;

if (process.env.NODE_ENV === 'development') {
  window.store = store;
}

/* eslint-disable no-unused-expressions */
if (RUNNING_IN_POPUP) import(/* webpackChunkName: "popup" */ './popup');
else if (!RUNNING_IN_FRAME) import(/* webpackChunkName: "ui" */ './ui');
/* eslint-enable no-unused-expressions */

console.log(t);

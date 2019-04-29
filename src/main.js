import Vue from 'vue';
import './lib/setGlobalPolyfills';
import './lib/initEnv';
import store from './store';

Vue.config.productionTip = false;

if (process.env.NODE_ENV === 'development') {
  window.store = store;
}

if (!process.env.RUNNING_IN_FRAME) import(/* webpackChunkName: "ui" */ './ui');

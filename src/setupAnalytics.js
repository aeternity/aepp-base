import Matomo from 'vue-matomo/src/matomo';
import Countly from 'countly-sdk-web';
import { defer } from 'lodash-es';
import router from './router';
import store from './store';

export default () => {
  const matomo = Matomo.getTracker(
    `${process.env.VUE_APP_MATOMO_URL}/piwik.php`,
    process.env.VUE_APP_MATOMO_SITE_ID,
  );
  matomo.setCustomDimension(1, process.env.IS_MOBILE_DEVICE);
  matomo.setCustomDimension(2, process.env.IS_PWA);
  matomo.setCustomDimension(3, process.env.IS_IOS);
  matomo.setCustomDimension(4, process.env.npm_package_version);
  matomo.setCustomDimension(5, process.env.IS_CORDOVA);
  matomo.setCustomVariable(1, 'accounts-count', store.state.accounts.list.length);
  matomo.trackPageView();
  matomo.enableLinkTracking();
  matomo.enableJSErrorTracking();

  Countly.init({
    url: process.env.VUE_APP_COUNTLY_URL,
    app_key: process.env.VUE_APP_COUNTLY_APP_KEY,
    app_version: process.env.npm_package_version,
  });
  Countly.add_event({ key: `is-mobile-device:${process.env.IS_MOBILE_DEVICE}` });
  Countly.add_event({ key: `is-pwa:${process.env.IS_PWA}` });
  Countly.add_event({ key: `is-ios:${process.env.IS_IOS}` });
  Countly.add_event({ key: `is-cordova:${process.env.IS_CORDOVA}` });
  Countly.add_event({
    key: 'accounts-count',
    sum: store.state.accounts.list.length,
  });
  Countly.track_sessions();
  Countly.track_links();
  Countly.track_errors();

  router.afterEach(() => defer(() => {
    const url = window.location.pathname + window.location.hash;
    matomo.setCustomUrl(url);
    matomo.trackPageView();
    Countly.track_pageview(url);
  }));

  store.subscribeAction(({ type, payload }) => {
    if (type !== 'modals/open') return;
    matomo.trackEvent('modal', 'open', payload.name);
    Countly.add_event({ key: `modals/open/${payload.name}` });
  });
};

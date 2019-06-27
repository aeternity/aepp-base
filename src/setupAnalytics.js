import Matomo from 'vue-matomo/src/matomo';
import { defer } from 'lodash-es';
import routerPromise from './router';
import store from './store';

export default async () => {
  const matomo = Matomo.getTracker(
    `${process.env.VUE_APP_MATOMO_URL}/piwik.php`,
    process.env.VUE_APP_MATOMO_SITE_ID,
  );
  matomo.disableCookies();
  matomo.setCustomDimension(1, process.env.IS_MOBILE_DEVICE);
  matomo.setCustomDimension(2, process.env.IS_PWA);
  matomo.setCustomDimension(3, process.env.IS_IOS);
  matomo.setCustomDimension(4, process.env.npm_package_version);
  matomo.setCustomDimension(5, process.env.IS_CORDOVA);
  matomo.setCustomVariable(1, 'accounts-count', store.state.accounts.list.length);
  matomo.trackPageView();
  matomo.enableLinkTracking();
  matomo.enableJSErrorTracking();

  (await routerPromise).afterEach(() => defer(() => {
    const url = window.location.pathname + window.location.hash;
    matomo.setCustomUrl(url);
    matomo.trackPageView();
  }));

  store.subscribeAction(({ type, payload }) => {
    if (type !== 'modals/open') return;
    matomo.trackEvent('modal', 'open', payload.name);
  });
};

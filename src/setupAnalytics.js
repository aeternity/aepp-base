import Matomo from 'vue-matomo/src/matomo';
import routerPromise from './router';
import store from './store';

export default async () => {
  const router = await routerPromise;
  const matomo = Matomo.getTracker(
    `${process.env.VUE_APP_MATOMO_URL}/piwik.php`,
    process.env.VUE_APP_MATOMO_SITE_ID,
  );

  const trackPageView = (route) => {
    let { fullPath } = route;
    switch (route.name) {
      case 'send-to':
      case 'send-confirm':
        fullPath = fullPath.replace(route.params.to, '<to>');
        break;
      case 'transaction-details':
        fullPath = fullPath.replace(route.params.hash, '<hash>');
        break;
      default:
    }
    matomo.setCustomUrl(fullPath);
    matomo.setDocumentTitle(route.name);
    matomo.trackPageView();
  };

  matomo.disableCookies();
  matomo.setCustomDimension(1, process.env.IS_MOBILE_DEVICE);
  matomo.setCustomDimension(2, process.env.IS_PWA);
  matomo.setCustomDimension(3, process.env.IS_IOS);
  matomo.setCustomDimension(4, process.env.npm_package_version);
  matomo.setCustomDimension(5, process.env.IS_CORDOVA);
  matomo.setCustomVariable(1, 'accounts-count', store.state.accounts.list.length);
  trackPageView(router.currentRoute);
  matomo.enableLinkTracking();
  matomo.enableJSErrorTracking();

  router.afterEach(to => trackPageView(to));

  store.subscribeAction(({ type, payload }) => {
    if (type !== 'modals/open') return;
    matomo.trackEvent('modal', 'open', payload.name);
  });
};

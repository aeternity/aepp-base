import Vue from 'vue';
import Matomo from 'vue-matomo';
import Countly from 'countly-sdk-web';
import { defer } from 'lodash-es';
import router from './router';

export default () => {
  Vue.use(Matomo, {
    host: process.env.VUE_APP_MATOMO_URL,
    siteId: process.env.VUE_APP_MATOMO_SITE_ID,
    router,
  });

  Countly.init({
    url: process.env.VUE_APP_COUNTLY_URL,
    app_key: process.env.VUE_APP_COUNTLY_APP_KEY,
  });
  Countly.q.push(['track_sessions']);
  router.afterEach(() => defer(() => Countly.q
    .push(['track_pageview', window.location.pathname + window.location.hash])));
};

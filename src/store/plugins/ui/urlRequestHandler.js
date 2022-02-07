import { times } from 'lodash-es';
import { ensureLoggedIn, mergeEnterHandlers } from '../../../router/utils';
import { ROUTE_MOBILE_LOGGED_IN } from '../../../lib/constants';

const urlRequestMethods = ['address', 'addressAndNetworkUrl', 'sign', 'signTransaction'];

export default (store) => {
  const handleUrlRequest = async (url) => {
    const method = url.path.replace('/', '');
    const callbackUrl = new URL(url.query.callback);
    const lastParamIdx = Math.max(
      0,
      ...Array.from(Object.keys(url.query))
        .map((key) => key.startsWith('param') && +key.replace('param', '')),
    );
    const params = times(
      lastParamIdx,
      (idx) => JSON.parse(decodeURIComponent(url.query[`param${idx}`])),
    );
    const reply = ({ result, error }) => {
      const seraliseError = (e) => (e instanceof Error ? e.message : e.toString());
      callbackUrl.searchParams.set(
        error ? 'error' : 'result',
        error ? seraliseError(error) : JSON.stringify(result),
      );
      if (process.env.IS_CORDOVA) {
        window.open(callbackUrl, '_system');
      } else {
        window.location.href = callbackUrl;
      }
    };

    if (!['http:', 'https:'].includes(callbackUrl.protocol)) {
      reply({ error: new Error(`Unknown protocol: ${callbackUrl.protocol}`) });
      return;
    }
    if (!urlRequestMethods.includes(method)) {
      reply({ error: new Error(`Unknown method: ${method}`) });
      return;
    }
    try {
      if (store.state.sdk.then) await store.state.sdk;
      reply({
        result: await store.state.sdk[method](
          ...params,
          store.state.sdk.getApp(callbackUrl.host),
        ),
      });
    } catch (error) {
      reply({ error });
    }
  };

  urlRequestMethods.forEach((methodName) => store.dispatch('router/addRoute', {
    name: methodName,
    path: `/${methodName}`,
    beforeEnter: mergeEnterHandlers(
      ensureLoggedIn,
      (to, from, next) => {
        handleUrlRequest(to);
        next(ROUTE_MOBILE_LOGGED_IN);
      },
    ),
  }));
};

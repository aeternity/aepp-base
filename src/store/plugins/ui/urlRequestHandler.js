import { times } from 'lodash-es';
import { ensureLoggedIn, mergeEnterHandlers } from '../../../router/utils';

const urlRequestMethods = ['address', 'sign', 'signTransaction'];

export default (store) => {
  const handleUrlRequest = async (url) => {
    const method = url.path.replace('/', '');
    const callbackUrl = new URL(url.query.callback);
    const lastParamIdx = Math.max(
      -1,
      ...Array.from(Object.keys(url.query))
        .filter((key) => key.startsWith('param'))
        .map((key) => +key.replace('param', '')),
    );
    const params = times(
      lastParamIdx + 1,
      (idx) => JSON.parse(decodeURIComponent(url.query[`param${idx}`])),
    );
    const reply = ({ result, error }) => {
      const seraliseError = (e) => (e instanceof Error ? e.message : e.toString());
      callbackUrl.searchParams.set(
        error ? 'error' : 'result',
        error ? seraliseError(error) : JSON.stringify(result),
      );
      if (process.env.VUE_APP_CORDOVA) {
        window.open(callbackUrl, '_system');
      } else {
        window.location.href = callbackUrl;
      }
    };

    if (
      !['http:', 'https:'].includes(callbackUrl.protocol)
      && !callbackUrl.href.startsWith('about:blank')
    ) {
      reply({ error: new Error(`Unknown protocol: ${callbackUrl.protocol}`) });
      return;
    }
    if (!urlRequestMethods.includes(method)) {
      reply({ error: new Error(`Unknown method: ${method}`) });
      return;
    }
    try {
      await store.state.sdk;
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
        next(false);
      },
    ),
  }));
};

import { times } from 'lodash-es';

export default {
  methods: {
    async handleDeeplinkUrl(url) {
      const method = url.path.replace('/', '');
      const callbackUrl = new URL(url.query.callback);
      const lastParamIdx = Math.max(
        0,
        ...Array.from(Object.keys(url.query))
          .map(key => key.startsWith('param') && +key.replace('param', '')),
      );
      const params = times(
        lastParamIdx,
        idx => JSON.parse(decodeURIComponent(url.query[`param${idx}`])),
      );
      const reply = ({ result, error }) => {
        const seraliseError = e => (e instanceof Error ? e.message : e.toString());
        callbackUrl.searchParams.set(
          error ? 'error' : 'result',
          error ? seraliseError(error) : JSON.stringify(result),
        );
        window.open(callbackUrl, process.env.IS_CORDOVA ? '_system' : '_blank');
      };

      if (!['http:', 'https:'].includes(callbackUrl.protocol)) {
        reply({ error: new Error(`Unknown protocol: ${callbackUrl.protocol}`) });
        return;
      }
      if (!['address', 'sign', 'signTransaction', 'addressAndNetworkUrl'].includes(method)) {
        reply({ error: new Error(`Unknown method: ${method}`) });
        return;
      }
      try {
        reply({ result: await this[method](...params, this.getApp(callbackUrl.host)) });
      } catch (error) {
        reply({ error });
      }
    },
  },
};

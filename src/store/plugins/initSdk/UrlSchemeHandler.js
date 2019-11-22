import { times } from 'lodash-es';

export default {
  init() {
    window.handleOpenURL = async (u) => {
      const url = new URL(u);
      const method = url.pathname;
      const callbackUrl = new URL(url.searchParams.get('callback'));
      const lastParamIdx = Math.max(
        0,
        ...Array.from(url.searchParams.keys())
          .map(key => key.startsWith('param') && +key.replace('param', '')),
      );
      const params = times(
        lastParamIdx + 1,
        idx => JSON.parse(decodeURIComponent(url.searchParams.get(`param${idx}`))),
      );
      const reply = ({ result, error }) => {
        const seraliseError = e => (e instanceof Error ? e.message : JSON.stringify(e));
        callbackUrl.searchParams.set(
          error ? 'error' : 'result',
          error ? seraliseError(error) : JSON.stringify(result),
        );
        window.open(callbackUrl, process.env.IS_CORDOVA ? '_system' : undefined);
      };

      if (!['http:', 'https:'].includes(callbackUrl.protocol)) {
        reply({ error: new Error(`Unknown protocol: ${callbackUrl.protocol}`) });
        return;
      }
      if (!['address', 'sign', 'signTransaction'].includes(method)) {
        reply({ error: new Error(`Unknown method: ${method}`) });
        return;
      }
      try {
        reply({ result: await this[method](...params, this.getApp(callbackUrl.host)) });
      } catch (error) {
        reply({ error });
      }
    };
  },
};

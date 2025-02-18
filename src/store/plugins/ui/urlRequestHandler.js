import { times } from 'lodash-es';
import { ensureLoggedIn, mergeEnterHandlers } from '../../../router/utils';

export default (store) => {
  async function ensureActiveAccountAccess(appHost) {
    // TODO: extract duplicate code
    const accessToAccounts = store.getters.getApp(appHost)?.permissions.accessToAccounts ?? [];
    const getActiveAddress = () => store.getters['accounts/active'].address;
    if (accessToAccounts.includes(getActiveAddress())) return;

    const controller = new AbortController();
    const unsubscribe = store.watch(
      () => getActiveAddress(),
      (address) => accessToAccounts.includes(address) && controller.abort(),
    );
    try {
      await store.dispatch(
        'modals/open',
        { name: 'confirmAccountAccess', signal: controller.signal, appHost },
      );
      store.commit('toggleAccessToAccount', { appHost, accountAddress: getActiveAddress() });
    } catch (error) {
      if (error.message === 'Modal aborted') return;
      throw error;
    } finally {
      unsubscribe();
    }
  }

  async function ensureRoutedToTransfer() {
    await new Promise((resolve) => {
      const unsubscribe = store.watch(
        (state) => state.route.name,
        (name) => {
          if (name !== 'transfer') return;
          resolve();
          unsubscribe();
        },
        { immediate: true },
      )
    });
  }

  const urlRequestHandlers = {
    async address(host) {
      await ensureActiveAccountAccess(host);
      return store.getters['accounts/active'].address;
    },
    async sign(_host, data) {
      return store.getters.account.sign(data);
    },
    signTransaction(_host, tx) {
      return store.getters.account.signTransaction(tx);
    },
  };

  const handleUrlRequest = async (url, method) => {
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
    try {
      await ensureRoutedToTransfer();
      reply({ result: await urlRequestHandlers[method](callbackUrl.host, ...params) });
    } catch (error) {
      reply({ error });
    }
  };

  // Each 'router/addRoute' call reevaluates beforeEnter, but we need to call `handleUrlRequest` once
  let handling = false;
  Object.keys(urlRequestHandlers).forEach((methodName) => store.dispatch('router/addRoute', {
    name: methodName,
    path: `/${methodName}`,
    beforeEnter: mergeEnterHandlers(
      ensureLoggedIn,
      async (to, _from, next) => {
        next(false);
        if (handling) return;
        handling = true;
        try {
          await handleUrlRequest(to, methodName);
        } finally {
          handling = false;
        }
      },
    ),
  }));
};

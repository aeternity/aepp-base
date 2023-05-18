import { register } from 'register-service-worker';

export default (store) => {
  let promise = Promise.resolve(null);

  if (process.env.NODE_ENV === 'production' && !process.env.VUE_APP_CORDOVA) {
    promise = new Promise((resolve, reject) => {
      register(`${process.env.BASE_URL}service-worker.js`, {
        registered: (registration) => resolve(registration),
        error: (error) => reject(error),
        async updated(registration) {
          if (await store.dispatch('modals/open', { name: 'shouldApplyUpdate' })) {
            registration.waiting.postMessage({ action: 'skipWaiting' });
          }
        },
      });
    });

    if (navigator.serviceWorker) {
      const { controller } = navigator.serviceWorker;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (controller == null) return;
        window.location.reload();
      });
    }
  }

  store.registerModule('serviceWorker', {
    actions: {
      getServiceWorkerRegistration: () => promise,
    },
  });
};

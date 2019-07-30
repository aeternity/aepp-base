import { register } from 'register-service-worker';

export default (store) => {
  if (process.env.NODE_ENV === 'production') {
    register(`${process.env.BASE_URL}service-worker.js`, {
      registered(registration) {
        store.commit('setServiceWorkerRegistration', registration);
      },
      async updated(registration) {
        if (await store.dispatch('modals/open', { name: 'shouldApplyUpdate' })) {
          registration.waiting.postMessage({ action: 'skipWaiting' });
        }
      },
    });

    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    }
  }
};

import { register } from 'register-service-worker';

export default (store) => {
  if (process.env.NODE_ENV === 'production') {
    register(`${process.env.BASE_URL}service-worker.js`, {
      registered(registration) {
        store.commit('setServiceWorkerRegistration', registration);
      },
      updated() {
        store.dispatch('modals/notification', {
          text: 'New version is available, please restart the Base æpp',
        });
      },
    });
  }
};

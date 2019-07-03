import { register } from 'register-service-worker';

export default (store) => {
  if (process.env.NODE_ENV === 'production') {
    register(`${process.env.BASE_URL}service-worker.js`, {
      registered(registration) {
        store.commit('setServiceWorkerRegistration', registration);
      },
      updated() {
        store.dispatch('modals/open', {
          name: 'notification',
          text: `A new version is available. ${process.env.IS_PWA
            ? 'Please restart the Base æpp'
            : 'Please close all Base æpp tabs and navigate to the Base æpp again to restart.'}`,
        });
      },
    });
  }
};

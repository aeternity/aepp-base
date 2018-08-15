import { register } from 'register-service-worker';

export default (store) => {
  if (process.env.NODE_ENV === 'production') {
    register(`${process.env.BASE_URL}service-worker.js`, {
      updated() {
        store.dispatch('setNotification', {
          text: 'New version is available, please restart the Base æpp',
          autoClose: true,
        });
      },
      offline() {
        store.dispatch('setNotification', {
          text: 'You are currently offline',
          autoClose: true,
        });
      },
    });
  }
};

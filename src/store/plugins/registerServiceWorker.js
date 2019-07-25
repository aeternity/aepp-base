import { register } from 'register-service-worker';
import { i18n } from './ui/languages';

export default (store) => {
  if (process.env.NODE_ENV === 'production') {
    register(`${process.env.BASE_URL}service-worker.js`, {
      registered(registration) {
        store.commit('setServiceWorkerRegistration', registration);
      },
      updated() {
        store.dispatch('modals/open', {
          name: 'notification',
          text: process.env.IS_PWA
            ? i18n.t('update-available.app') : i18n.t('update-available.web'),
        });
      },
    });
  }
};

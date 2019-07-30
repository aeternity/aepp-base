import { merge } from 'lodash-es';
import { registerModal } from '../../store/plugins/ui/modals';
import { notificationOptions } from './utils';
import AlertModal from '../../components/AlertModal.vue';
import { QrCodeReader } from '../../components/async';
import Notification from '../../components/Notification.vue';

export default async () => {
  registerModal({ name: 'alert', component: AlertModal });
  registerModal({
    name: 'confirm',
    component: {
      functional: true,
      render: (h, context) => h(AlertModal, merge({}, context, { props: { confirm: true } })),
    },
  });
  registerModal({ name: 'readQrCode', component: QrCodeReader, hidePage: true });
  registerModal({ name: 'notification', component: Notification, ...notificationOptions });

  (await (process.env.IS_MOBILE_DEVICE
    ? import(/* webpackChunkName: "ui-mobile" */ './mobile')
    : import(/* webpackChunkName: "ui-desktop" */ './desktop'))).default();
};

import { merge } from 'lodash-es';
import { checkLoggedIn } from '../utils';
import Settings from '../../pages/Settings.vue';
import SettingsNetwork from '../../pages/SettingsNetwork.vue';

const Receive = () => import('../../pages/Receive.vue');

export default [{
  name: 'receive',
  path: '/receive',
  component: Receive,
  beforeEnter: checkLoggedIn(true),
}, {
  name: 'settings',
  path: '/settings',
  component: Settings,
  beforeEnter: checkLoggedIn(false),
}, {
  name: 'settings-network',
  path: '/settings/network',
  component: SettingsNetwork,
  beforeEnter: checkLoggedIn(false),
}].map(route => merge(route, { meta: { displayFooter: true } }));

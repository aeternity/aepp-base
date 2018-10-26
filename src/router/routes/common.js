import { merge } from 'lodash-es';
import { checkLoggedIn } from '../utils';
import Settings from '../../pages/Settings.vue';
import SettingsNetwork from '../../pages/SettingsNetwork.vue';

const Transfer = () => import('../../pages/Transfer.vue');

export default [{
  name: 'transfer',
  path: '/transfer/:to?/:amount?',
  component: Transfer,
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

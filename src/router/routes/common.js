import { merge } from 'lodash-es';
import { checkLoggedIn } from '../utils';
import Receive from '../../pages/Receive.vue';
import Settings from '../../pages/Settings.vue';

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
}].map(route => merge(route, { meta: { displayFooter: true } }));

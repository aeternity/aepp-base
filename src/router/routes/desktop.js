import Apps from '../../pages/desktop/Apps.vue';
import Send from '../../pages/desktop/Send.vue';
import Receive from '../../pages/desktop/Receive.vue';
import Settings from '../../pages/desktop/Settings.vue';
import { ensureLoggedIn } from '../utils';

export default [
  {
    name: 'apps',
    path: '/',
    component: Apps,
  },
  {
    name: 'send',
    path: '/send',
    component: Send,
    beforeEnter: ensureLoggedIn,
  },
  {
    name: 'receive',
    path: '/receive',
    component: Receive,
  },
  {
    name: 'settings',
    path: '/settings',
    component: Settings,
  },
];

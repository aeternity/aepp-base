import Apps from '../../pages/desktop/Apps.vue';
import Receive from '../../pages/desktop/Receive.vue';
import Settings from '../../pages/desktop/Settings.vue';

export default [{
  name: 'apps',
  path: '/',
  component: Apps,
}, {
  name: 'receive',
  path: '/receive',
  component: Receive,
}, {
  name: 'settings',
  path: '/settings',
  component: Settings,
}];

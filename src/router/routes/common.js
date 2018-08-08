import { checkLoggedIn } from '../utils'
import Apps from '../../pages/Apps/Apps.vue'
import AppBrowser from '../../pages/AppBrowser/AppBrowser.vue'
import AddApp from '../../pages/AddApp/AddApp.vue'
import AddressBook from '../../pages/AddressBook.vue'
import AddressBookNew from '../../pages/AddressBookNew.vue'
import AddressBookChoose from '../../pages/AddressBookChoose.vue'
import Settings from '../../pages/Settings.vue'
import SettingsNetwork from '../../pages/SettingsNetwork.vue'

const Transfer = () => import('../../pages/Transfer/Transfer.vue')

export default [{
  name: 'apps',
  path: process.env.IS_MOBILE_DEVICE ? '/apps' : '/',
  component: Apps,
  beforeEnter: checkLoggedIn(false)
}, {
  name: 'transfer',
  path: '/transfer/:to?/:amount?',
  component: Transfer,
  beforeEnter: checkLoggedIn(true)
}, {
  name: 'settings',
  path: '/settings',
  component: Settings,
  beforeEnter: checkLoggedIn(false)
}, {
  name: 'settings-network',
  path: '/settings/network',
  component: SettingsNetwork,
  beforeEnter: checkLoggedIn(false)
}, {
  name: 'add-app',
  path: '/add-app',
  component: AddApp,
  beforeEnter: checkLoggedIn(true)
}, {
  name: 'address-book',
  path: '/addresses',
  component: AddressBook,
  beforeEnter: checkLoggedIn(true)
}, {
  name: 'address-book-new',
  path: '/addresses/new',
  component: AddressBookNew,
  beforeEnter: checkLoggedIn(true)
}, {
  name: 'address-book-choose',
  path: '/addresses/choose/:redirectPathTemplate',
  component: AddressBookChoose,
  beforeEnter: checkLoggedIn(true),
  props: true
}, {
  name: 'app-browser',
  path: '/:name/:path*',
  component: AppBrowser,
  beforeEnter: checkLoggedIn(false)
}]

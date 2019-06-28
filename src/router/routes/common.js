import { ensureLoggedIn } from '../utils';
import AddressBook from '../../pages/AddressBook.vue';
import AddressBookNew from '../../pages/AddressBookNew.vue';
import AddressBookChoose from '../../pages/AddressBookChoose.vue';
import NotFound from '../../pages/NotFound.vue';

export default [...process.env.UNFINISHED_FEATURES ? [{
  name: 'address-book',
  path: '/addresses',
  component: AddressBook,
  beforeEnter: ensureLoggedIn,
}, {
  name: 'address-book-new',
  path: '/addresses/new',
  component: AddressBookNew,
  beforeEnter: ensureLoggedIn,
}, {
  name: 'address-book-choose',
  path: '/addresses/choose/:redirectPathTemplate',
  component: AddressBookChoose,
  beforeEnter: ensureLoggedIn,
  props: true,
}] : [], {
  name: 'not-found',
  path: '*',
  component: NotFound,
}];

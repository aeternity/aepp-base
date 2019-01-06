import { checkLoggedIn } from '../utils';
import store from '../../store/index';
import Intro from '../../pages/mobile/Intro.vue';
import Onboarding from '../../pages/mobile/Onboarding.vue';
import OnboardingWelcome from '../../pages/mobile/OnboardingWelcome.vue';
import OnboardingSubaccounts from '../../pages/mobile/OnboardingSubaccounts.vue';
import OnboardingSend from '../../pages/mobile/OnboardingSend.vue';
import Login from '../../pages/mobile/Login.vue';
import Recover from '../../pages/mobile/Recover.vue';
import Apps from '../../pages/Apps.vue';
import NewAccount from '../../pages/mobile/NewAccount.vue';
import NewAccountCreate from '../../pages/mobile/NewAccountCreate.vue';
import NewAccountConfirm from '../../pages/mobile/NewAccountConfirm.vue';
import SetPassword from '../../pages/mobile/SetPassword.vue';
import AccountsNew from '../../pages/mobile/AccountsNew.vue';
import Transfer from '../../pages/mobile/Transfer.vue';
import Receive from '../../pages/mobile/Receive.vue';
import Send from '../../pages/mobile/Send.vue';
import SendAmount from '../../pages/mobile/SendAmount.vue';
import SendConfirm from '../../pages/mobile/SendConfirm.vue';
import Settings from '../../pages/mobile/Settings.vue';
import SettingsNetwork from '../../pages/mobile/SettingsNetwork.vue';
import SettingsNetworkNew from '../../pages/mobile/SettingsNetworkNew.vue';
import SettingsRemoteConnection from '../../pages/mobile/SettingsRemoteConnection.vue';

const SettingsRemoteConnectionNew = () => import('../../pages/mobile/SettingsRemoteConnectionNew.vue');

const checkSeedPassed = (to, from, next) => {
  if (!to.params.seed) {
    next({ name: 'intro' });
    return;
  }
  next();
};

export default [{
  name: 'intro',
  path: '/',
  component: Intro,
  beforeEnter(to, from, next) {
    if (!from.name && store.state.mobile.keystore) {
      next({ name: 'login' });
      return;
    }
    next();
  },
}, {
  path: '/onboarding',
  component: Onboarding,
  children: [{
    name: 'onboarding',
    path: '',
    component: OnboardingWelcome,
  }, {
    name: 'onboarding-subaccounts',
    path: 'subaccounts',
    component: OnboardingSubaccounts,
  }, {
    name: 'onboarding-send',
    path: 'send',
    component: OnboardingSend,
  }],
}, {
  name: 'login',
  path: '/login',
  component: Login,
  beforeEnter(to, from, next) {
    if (!store.state.mobile.keystore) {
      next({ name: 'new-account' });
      return;
    }
    if (store.getters.loggedIn) {
      next({ name: 'apps' });
      return;
    }
    next();
  },
}, {
  name: 'recover',
  path: '/recover',
  component: Recover,
}, {
  name: 'new-account',
  path: '/new-account',
  component: NewAccount,
}, {
  name: 'new-account-create',
  path: '/new-account/create',
  component: NewAccountCreate,
}, {
  name: 'new-account-confirm',
  path: '/new-account/confirm',
  component: NewAccountConfirm,
  beforeEnter: checkSeedPassed,
  props: true,
}, {
  name: 'set-password',
  path: '/set-password',
  component: SetPassword,
  beforeEnter: checkSeedPassed,
  props: true,
}, {
  name: 'apps',
  path: '/apps',
  component: Apps,
  beforeEnter: checkLoggedIn(false),
  meta: {
    displayFooter: true,
  },
}, {
  name: 'accounts-new',
  path: '/accounts-new',
  component: AccountsNew,
  beforeEnter: checkLoggedIn(true),
  meta: {
    displayFooter: true,
  },
}, {
  name: 'transfer',
  path: '/transfer',
  component: Transfer,
  beforeEnter: checkLoggedIn(true),
  props: true,
  meta: {
    displayFooter: true,
  },
}, {
  name: 'receive',
  path: '/receive',
  component: Receive,
  beforeEnter: checkLoggedIn(true),
  meta: {
    displayFooter: true,
  },
}, {
  name: 'send',
  path: '/send',
  component: Send,
  beforeEnter: checkLoggedIn(true),
  meta: {
    displayFooter: true,
  },
}, {
  name: 'send-to',
  path: '/send/:to',
  component: SendAmount,
  beforeEnter: checkLoggedIn(true),
  props: true,
  meta: {
    displayFooter: true,
  },
}, {
  name: 'send-confirm',
  path: '/send/:to/:amount',
  component: SendConfirm,
  beforeEnter: checkLoggedIn(true),
  props: true,
}, {
  name: 'settings',
  path: '/settings',
  component: Settings,
  beforeEnter: checkLoggedIn(false),
  meta: {
    displayFooter: true,
  },
}, {
  name: 'settings-network',
  path: '/settings/network',
  component: SettingsNetwork,
  beforeEnter: checkLoggedIn(false),
  meta: {
    displayFooter: true,
  },
}, {
  name: 'settings-network-new',
  path: '/settings/network/new',
  component: SettingsNetworkNew,
  beforeEnter: checkLoggedIn(false),
  meta: {
    displayFooter: true,
  },
}, {
  name: 'settings-remote-connection',
  path: '/settings/remote-connection',
  component: SettingsRemoteConnection,
  beforeEnter: checkLoggedIn(true),
  meta: {
    displayFooter: true,
  },
}, {
  name: 'settings-remote-connection-new',
  path: '/settings/remote-connection/new',
  component: SettingsRemoteConnectionNew,
  beforeEnter: checkLoggedIn(true),
}];

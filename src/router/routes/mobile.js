import { merge } from 'lodash-es';
import { ensureLoggedIn } from '../utils';
import store from '../../store/index';
import AddToHomeScreenPrompt from '../../pages/mobile/AddToHomeScreenPrompt.vue';
import Intro from '../../pages/mobile/Intro.vue';
import Onboarding from '../../pages/mobile/Onboarding.vue';
import OnboardingWelcome from '../../pages/mobile/OnboardingWelcome.vue';
import OnboardingSend from '../../pages/mobile/OnboardingSend.vue';
import OnboardingAepps from '../../pages/mobile/OnboardingAepps.vue';
import OnboardingSubaccounts from '../../pages/mobile/OnboardingSubaccounts.vue';
import Login from '../../pages/mobile/Login.vue';
import Recover from '../../pages/mobile/Recover.vue';
import AppBrowser from '../../pages/mobile/AppBrowser.vue';
import VaultSetupMethod from '../../pages/mobile/VaultSetupMethod.vue';
import VaultSetupAnotherDevice from '../../pages/mobile/VaultSetupAnotherDevice.vue';
import VaultSetupAnotherDeviceGuide from '../../pages/mobile/VaultSetupAnotherDeviceGuide.vue';
import VaultSetupSameDevice from '../../pages/mobile/VaultSetupSameDevice.vue';
import VaultSetupSameDeviceSync from '../../pages/mobile/VaultSetupSameDeviceSync.vue';
import VaultSetupCompleted from '../../pages/mobile/VaultSetupCompleted.vue';
import Transfer from '../../pages/mobile/Transfer.vue';
import Receive from '../../pages/mobile/Receive.vue';
import Send from '../../pages/mobile/Send.vue';
import SendAmount from '../../pages/mobile/SendAmount.vue';
import SendConfirm from '../../pages/mobile/SendConfirm.vue';
import TransactionList from '../../pages/mobile/TransactionList.vue';
import TransactionDetails from '../../pages/mobile/TransactionDetails.vue';
import AuctionList from '../../pages/mobile/AuctionList.vue';
import AuctionDetails from '../../pages/mobile/AuctionDetails.vue';
import AuctionBid from '../../pages/mobile/AuctionBid.vue';
import NameList from '../../pages/mobile/NameList.vue';
import NameDetails from '../../pages/mobile/NameDetails.vue';
import NameNew from '../../pages/mobile/NameNew.vue';
import NameTransfer from '../../pages/mobile/NameTransfer.vue';
import Settings from '../../pages/mobile/Settings.vue';
import SettingsNetwork from '../../pages/mobile/SettingsNetwork.vue';
import SettingsNetworkNew from '../../pages/mobile/SettingsNetworkNew.vue';
import SettingsCurrency from '../../pages/mobile/SettingsCurrency.vue';
import SettingsRemoteConnection from '../../pages/mobile/SettingsRemoteConnection.vue';
import SettingsRemoteConnectionNew from '../../pages/mobile/SettingsRemoteConnectionNew.vue';
import SettingsAppList from '../../pages/mobile/SettingsAppList.vue';
import SettingsAppDetails from '../../pages/mobile/SettingsAppDetails.vue';
import SettingsMnemonic from '../../pages/mobile/SettingsMnemonic.vue';
import SettingsMnemonicShow from '../../pages/mobile/SettingsMnemonicShow.vue';
import SettingsMnemonicConfirm from '../../pages/mobile/SettingsMnemonicConfirm.vue';
import SettingsMnemonicConfirmed from '../../pages/mobile/SettingsMnemonicConfirmed.vue';
import SettingsMnemonicDeleted from '../../pages/mobile/SettingsMnemonicDeleted.vue';
import SettingsSecurityCourseList from '../../pages/mobile/SettingsSecurityCourseList.vue';
import SettingsSecurityCourseIntro from '../../pages/mobile/SettingsSecurityCourseIntro.vue';
import SettingsSecurityCourseBank from '../../pages/mobile/SettingsSecurityCourseBank.vue';
import SettingsSecurityCoursePrivacy from '../../pages/mobile/SettingsSecurityCoursePrivacy.vue';
import SettingsSecurityCourseLayers from '../../pages/mobile/SettingsSecurityCourseLayers.vue';
import SettingsAccountRemove from '../../pages/mobile/SettingsAccountRemove.vue';
import SettingsPassword from '../../pages/mobile/SettingsPassword.vue';
import SettingsPasswordSet from '../../pages/mobile/SettingsPasswordSet.vue';
import SettingsLanguage from '../../pages/mobile/SettingsLanguage.vue';

const Apps = () => import(/* webpackChunkName: "page-apps" */ '../../pages/mobile/Apps.vue');
const RedeemBalance = () => import(/* webpackChunkName: "page-redeem" */ '../../pages/mobile/RedeemBalance.vue');

const mergeEnterHandlers = (...handlers) => (to, from, next) => next(
  handlers.reduce((nextRoute, handler) => {
    if (nextRoute) return nextRoute;
    let res;
    handler(to, from, (r) => { res = r; });
    return res;
  }, undefined),
);

const checkStoreMnemonic = (to, from, next) => {
  if (!store.state.accounts.hdWallet.mnemonic) {
    next({ name: 'settings-mnemonic-deleted' });
    return;
  }
  next();
};

const settingsMnemonicBeforeEnter = mergeEnterHandlers(ensureLoggedIn, checkStoreMnemonic);

export default [{
  name: 'add-to-home-screen',
  path: '/add-to-home-screen',
  component: AddToHomeScreenPrompt,
}, {
  name: 'intro',
  path: '/',
  component: Intro,
  beforeEnter(to, from, next) {
    if (!from.name && store.getters['accounts/hdWallet/isWalletEncrypted']) {
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
    name: 'onboarding-send',
    path: 'send',
    component: OnboardingSend,
  }, {
    name: 'onboarding-aepps',
    path: 'aepps',
    component: OnboardingAepps,
  }, {
    name: 'onboarding-subaccounts',
    path: 'subaccounts',
    component: OnboardingSubaccounts,
  }],
}, {
  name: 'login',
  path: '/login',
  component: Login,
  beforeEnter(to, from, next) {
    if (!store.state.accounts.hdWallet.encryptedWallet) {
      next({ name: 'intro' });
      return;
    }
    if (store.getters.loggedIn) {
      next({ name: 'transfer' });
      return;
    }
    next();
  },
}, {
  name: 'recover',
  path: '/recover',
  component: Recover,
}, {
  name: 'apps',
  path: '/browser',
  component: Apps,
  beforeEnter: ensureLoggedIn,
}, {
  name: 'app-browser',
  path: '/browser/*',
  component: AppBrowser,
  beforeEnter: ensureLoggedIn,
}, {
  name: 'vault-setup-method',
  path: '/vault/choose',
  component: VaultSetupMethod,
  beforeEnter: ensureLoggedIn,
}, {
  name: 'vault-setup-another-device',
  path: '/vault/another-device',
  component: VaultSetupAnotherDevice,
  beforeEnter: ensureLoggedIn,
}, {
  name: 'vault-setup-another-device-guide',
  path: '/vault/another-device/guide',
  component: VaultSetupAnotherDeviceGuide,
  beforeEnter: ensureLoggedIn,
}, {
  name: 'vault-setup-completed',
  path: '/vault/sync-completed',
  component: VaultSetupCompleted,
  beforeEnter: ensureLoggedIn,
}, ...process.env.IS_CORDOVA
  ? [{
    name: 'vault-setup-same-device',
    path: '/vault/same-device',
    component: VaultSetupSameDevice,
    beforeEnter: ensureLoggedIn,
  }, {
    name: 'vault-setup-same-device-sync',
    path: '/vault/same-device/sync',
    component: VaultSetupSameDeviceSync,
    beforeEnter: ensureLoggedIn,
  }] : [], {
  name: 'transfer',
  path: '/transfer',
  component: Transfer,
  beforeEnter: ensureLoggedIn,
}, {
  name: 'receive',
  path: '/transfer/receive',
  component: Receive,
  beforeEnter: ensureLoggedIn,
}, {
  name: 'send',
  path: '/transfer/send',
  component: Send,
  beforeEnter: ensureLoggedIn,
}, {
  name: 'send-to',
  path: '/transfer/send/:to',
  component: SendAmount,
  beforeEnter: ensureLoggedIn,
  props: true,
}, {
  name: 'send-confirm',
  path: '/transfer/send/:to/:amount',
  component: SendConfirm,
  beforeEnter: ensureLoggedIn,
  props: true,
}, {
  name: 'transaction-list',
  path: `${process.env.DISABLED_BROWSER ? '' : '/transfer'}/transactions/:direction?`,
  component: TransactionList,
  beforeEnter: ensureLoggedIn,
  props: true,
}, {
  name: 'transaction-details',
  path: `${process.env.DISABLED_BROWSER ? '' : '/transfer'}/transactions/details/:hash`,
  component: TransactionDetails,
  beforeEnter: ensureLoggedIn,
  props: true,
}, {
  name: 'redeem',
  path: '/transfer/redeem',
  component: RedeemBalance,
  beforeEnter: ensureLoggedIn,
}, {
  name: 'name-list-character-length',
  path: '/names/character-length/:length?/:page?',
  component: AuctionList,
  beforeEnter: mergeEnterHandlers(
    ensureLoggedIn,
    (to, from, next) => next(
      !to.params.length ? merge({}, to, { params: { length: 1 } }) : undefined,
    ),
  ),
  props: ({ params: { length, page } }) => ({
    length: length && +length,
    page: page && +page,
    view: 'character-length',
  }),
}, {
  name: 'auction-details',
  path: '/names/auction/:name',
  component: AuctionDetails,
  beforeEnter: ensureLoggedIn,
  props: true,
}, {
  name: 'name-list-personal',
  path: '/names',
  component: NameList,
  beforeEnter: ensureLoggedIn,
}, {
  name: 'name-details',
  path: '/names/personal/:name',
  component: NameDetails,
  beforeEnter: ensureLoggedIn,
  props: true,
}, {
  name: 'name-point',
  path: '/names/personal/:name/point',
  component: NameTransfer,
  beforeEnter: ensureLoggedIn,
  props: ({ params }) => ({ ...params, pointing: true }),
}, {
  name: 'name-transfer',
  path: '/names/personal/:name/transfer',
  component: NameTransfer,
  beforeEnter: ensureLoggedIn,
  props: true,
}, {
  name: 'auction-bid',
  path: '/names/bid/:name?',
  component: AuctionBid,
  beforeEnter: ensureLoggedIn,
  props: true,
}, {
  name: 'auction-bid-amount',
  path: '/names/bid/:name/amount',
  component: AuctionBid,
  beforeEnter: ensureLoggedIn,
  props: ({ params }) => ({ ...params, amountStep: true }),
}, {
  name: 'name-new',
  path: '/names/new',
  component: NameNew,
  beforeEnter: ensureLoggedIn,
}, {
  name: 'name-list',
  path: '/names/:view/:page?',
  component: AuctionList,
  beforeEnter: ensureLoggedIn,
  props: ({ params: { view, page } }) => ({ view, page: page && +page }),
}, {
  name: 'settings',
  path: '/settings',
  component: Settings,
  beforeEnter: ensureLoggedIn,
}, {
  name: 'settings-network',
  path: '/settings/network',
  component: SettingsNetwork,
  beforeEnter: ensureLoggedIn,
}, {
  name: 'settings-network-new',
  path: '/settings/network/new',
  component: SettingsNetworkNew,
  beforeEnter: ensureLoggedIn,
}, {
  name: 'settings-currency',
  path: '/settings/currency',
  component: SettingsCurrency,
  beforeEnter: ensureLoggedIn,
}, {
  name: 'settings-remote-connection',
  path: '/settings/remote-connection',
  component: SettingsRemoteConnection,
  beforeEnter: ensureLoggedIn,
}, {
  name: 'settings-remote-connection-new',
  path: '/settings/remote-connection/new',
  component: SettingsRemoteConnectionNew,
  beforeEnter: ensureLoggedIn,
}, {
  name: 'settings-app-list',
  path: '/settings/apps',
  component: SettingsAppList,
  beforeEnter: ensureLoggedIn,
}, {
  name: 'settings-app-details',
  path: '/settings/apps/:appHost',
  component: SettingsAppDetails,
  beforeEnter: ensureLoggedIn,
  props: true,
}, {
  name: 'settings-mnemonic',
  path: '/settings/mnemonic',
  component: SettingsMnemonic,
  beforeEnter: settingsMnemonicBeforeEnter,
}, {
  name: 'settings-mnemonic-show',
  path: '/settings/mnemonic/show',
  component: SettingsMnemonicShow,
  beforeEnter: settingsMnemonicBeforeEnter,
}, {
  name: 'settings-mnemonic-confirm',
  path: '/settings/mnemonic/confirm',
  component: SettingsMnemonicConfirm,
  beforeEnter: settingsMnemonicBeforeEnter,
}, {
  name: 'settings-mnemonic-confirmed',
  path: '/settings/mnemonic/confirmed',
  component: SettingsMnemonicConfirmed,
  beforeEnter: settingsMnemonicBeforeEnter,
}, {
  name: 'settings-mnemonic-deleted',
  path: '/settings/mnemonic/deleted',
  component: SettingsMnemonicDeleted,
  beforeEnter: ensureLoggedIn,
}, {
  name: 'settings-security-course-list',
  path: '/settings/security-courses',
  component: SettingsSecurityCourseList,
  beforeEnter: ensureLoggedIn,
  props: true,
}, {
  name: 'settings-security-course-intro',
  path: '/settings/security-courses/intro',
  component: SettingsSecurityCourseIntro,
  beforeEnter: ensureLoggedIn,
}, {
  name: 'settings-security-course-bank',
  path: '/settings/security-courses/bank',
  component: SettingsSecurityCourseBank,
  beforeEnter: ensureLoggedIn,
}, {
  name: 'settings-security-course-privacy',
  path: '/settings/security-courses/privacy',
  component: SettingsSecurityCoursePrivacy,
  beforeEnter: ensureLoggedIn,
}, {
  name: 'settings-security-course-layers',
  path: '/settings/security-courses/layers',
  component: SettingsSecurityCourseLayers,
  beforeEnter: ensureLoggedIn,
}, {
  name: 'settings-account-remove',
  path: '/settings/wallet/:idx',
  component: SettingsAccountRemove,
  beforeEnter: ensureLoggedIn,
  props: true,
}, {
  name: 'settings-password',
  path: '/settings/password',
  component: SettingsPassword,
  beforeEnter: ensureLoggedIn,
}, {
  name: 'settings-password-set',
  path: '/settings/password/set',
  component: SettingsPasswordSet,
  beforeEnter: ensureLoggedIn,
}, {
  name: 'settings-language',
  path: '/settings/language',
  component: SettingsLanguage,
  beforeEnter: ensureLoggedIn,
}];

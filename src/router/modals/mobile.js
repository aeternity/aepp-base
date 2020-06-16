import { registerModal } from '../../store/plugins/ui/modals';
import { notificationOptions } from './utils';
import AccountSwitcherModal from '../../components/mobile/AccountSwitcherModal.vue';
import SecurityCourseModal from '../../components/mobile/SecurityCourseModal.vue';
import ConfirmAccountAccessModal from '../../components/mobile/ConfirmAccountAccessModal.vue';
import ConfirmSignModal from '../../components/mobile/ConfirmSignModal.vue';
import VaultSignModal from '../../components/mobile/VaultSignModal.vue';
import NotificationMnemonicBackup from '../../components/mobile/NotificationMnemonicBackup.vue';
import PasswordModal from '../../components/mobile/PasswordModal.vue';
import TooltipsModal from '../../components/mobile/TooltipsModal.vue';
import NotificationSpendSuccess from '../../components/NotificationSpendSuccess.vue';

export default () => {
  registerModal({ name: 'accountSwitcher', component: AccountSwitcherModal });
  registerModal({ name: 'proposeToOpenSecurityCourses', component: SecurityCourseModal, allowRedirect: true });
  registerModal({ name: 'confirmAccountAccess', component: ConfirmAccountAccessModal });
  registerModal({ name: 'confirmSign', component: ConfirmSignModal, hidePage: true });
  registerModal({ name: 'vaultSign', component: VaultSignModal, hidePage: true });
  registerModal({ name: 'notificationMnemonicBackup', component: NotificationMnemonicBackup, ...notificationOptions });
  registerModal({ name: 'ensureKnowPassword', component: PasswordModal, hidePage: true });
  registerModal({ name: 'showTooltips', component: TooltipsModal, dontGrayscalePage: true });
  registerModal({ name: 'spendSuccess', component: NotificationSpendSuccess, ...notificationOptions });
};

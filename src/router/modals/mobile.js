import { registerModal } from '../../store/plugins/ui/modals';
import { notificationOptions } from './utils';
import AccountSwitcherModal from '../../components/mobile/AccountSwitcherModal.vue';
import SecurityCourseModal from '../../components/mobile/SecurityCourseModal.vue';
import MigratedBalanceModal from '../../components/mobile/MigratedBalanceModal.vue';
import ConfirmAccountAccessModal from '../../components/mobile/ConfirmAccountAccessModal.vue';
import ConfirmContractCallModal from '../../components/mobile/ConfirmContractCallModal.vue';
import ConfirmContractDeployModal from '../../components/mobile/ConfirmContractDeployModal.vue';
import ConfirmSignModal from '../../components/mobile/ConfirmSignModal.vue';
import ConfirmSpendModal from '../../components/mobile/ConfirmSpendModal.vue';
import VaultSignModal from '../../components/mobile/VaultSignModal.vue';
import NotificationMnemonicBackup from '../../components/mobile/NotificationMnemonicBackup.vue';
import PasswordModal from '../../components/mobile/PasswordModal.vue';

export default () => {
  registerModal({ name: 'accountSwitcher', component: AccountSwitcherModal });
  registerModal({ name: 'proposeToOpenSecurityCourses', component: SecurityCourseModal, allowRedirect: true });
  registerModal({ name: 'migratedBalance', component: MigratedBalanceModal });
  registerModal({ name: 'confirmAccountAccess', component: ConfirmAccountAccessModal });
  registerModal({ name: 'confirmContractCall', component: ConfirmContractCallModal, hidePage: true });
  registerModal({ name: 'confirmContractDeploy', component: ConfirmContractDeployModal, hidePage: true });
  registerModal({ name: 'confirmSign', component: ConfirmSignModal, hidePage: true });
  registerModal({ name: 'confirmSpend', component: ConfirmSpendModal, hidePage: true });
  registerModal({ name: 'vaultSign', component: VaultSignModal, hidePage: true });
  registerModal({ name: 'notificationMnemonicBackup', component: NotificationMnemonicBackup, ...notificationOptions });
  registerModal({ name: 'ensureKnowPassword', component: PasswordModal, hidePage: true });
};

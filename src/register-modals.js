import { registerModal } from './store/plugins/ui/modals';
import AlertModal from './components/AlertModal.vue';
import { QrCodeReader } from './components/async';
import Notification from './components/Notification.vue';
import NotificationSpend from './components/NotificationSpend.vue';
import AccountSwitcherModal from './components/mobile/AccountSwitcherModal.vue';
import MigratedBalanceModal from './components/mobile/MigratedBalanceModal.vue';
import ConfirmAccountAccessModal from './components/mobile/ConfirmAccountAccessModal.vue';
import ConfirmContractCallModal from './components/mobile/ConfirmContractCallModal.vue';
import ConfirmContractDeployModal from './components/mobile/ConfirmContractDeployModal.vue';
import ConfirmSignModal from './components/mobile/ConfirmSignModal.vue';
import ConfirmSpendModal from './components/mobile/ConfirmSpendModal.vue';
import VaultSignModal from './components/mobile/VaultSignModal.vue';
import LedgerAddressConfirmModal from './components/desktop/LedgerAddressConfirmModal.vue';
import LedgerSignTransactionModal from './components/desktop/LedgerSignTransactionModal.vue';
import LedgerTransactionFeeModal from './components/desktop/LedgerTransactionFeeModal.vue';
import CancelSignModal from './components/desktop/CancelSignModal.vue';

registerModal({ name: 'alert', component: AlertModal });
registerModal({ name: 'readQrCode', component: QrCodeReader, hidePage: true });
const notificationOptions = { allowRedirect: true, dontGrayscalePage: true };
registerModal({ name: 'notification', component: Notification, ...notificationOptions });
registerModal({ name: 'notificationSpend', component: NotificationSpend, ...notificationOptions });

if (process.env.IS_MOBILE_DEVICE) {
  registerModal({ name: 'accountSwitcher', component: AccountSwitcherModal });
  registerModal({ name: 'migratedBalance', component: MigratedBalanceModal });
  registerModal({ name: 'confirmAccountAccess', component: ConfirmAccountAccessModal });
  registerModal({ name: 'confirmContractCall', component: ConfirmContractCallModal, hidePage: true });
  registerModal({ name: 'confirmContractDeploy', component: ConfirmContractDeployModal, hidePage: true });
  registerModal({ name: 'confirmSign', component: ConfirmSignModal, hidePage: true });
  registerModal({ name: 'confirmSpend', component: ConfirmSpendModal, hidePage: true });
  registerModal({ name: 'vaultSign', component: VaultSignModal, hidePage: true });
} else {
  registerModal({ name: 'confirmLedgerAddress', component: LedgerAddressConfirmModal });
  registerModal({ name: 'getLedgerTransactionFee', component: LedgerTransactionFeeModal });
  registerModal({ name: 'ledgerSignTransaction', component: LedgerSignTransactionModal });
  registerModal({ name: 'cancelSign', component: CancelSignModal });
}

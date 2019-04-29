import { registerModal } from './store/plugins/modals';
import QrCodeReader from './components/QrCodeReader.vue';
import AccountSwitcherModal from './components/mobile/AccountSwitcherModal.vue';
import MigratedBalanceModal from './components/mobile/MigratedBalanceModal.vue';
import ConfirmAccountAccessModal from './components/mobile/ConfirmAccountAccessModal.vue';
import ConfirmContractCallModal from './components/mobile/ConfirmContractCallModal.vue';
import ConfirmContractDeployModal from './components/mobile/ConfirmContractDeployModal.vue';
import ConfirmSignModal from './components/mobile/ConfirmSignModal.vue';
import ConfirmSpendModal from './components/mobile/ConfirmSpendModal.vue';
import LedgerAddressConfirmModal from './components/desktop/LedgerAddressConfirmModal.vue';
import LedgerSignTransactionConfirmModal from './components/desktop/LedgerSignTransactionConfirmModal.vue';
import LedgerTransactionFeeModal from './components/desktop/LedgerTransactionFeeModal.vue';
import CancelSignModal from './components/desktop/CancelSignModal.vue';

registerModal({ name: 'readQrCode', component: QrCodeReader, hidePage: true });

if (process.env.IS_MOBILE_DEVICE) {
  registerModal({ name: 'accountSwitcher', component: AccountSwitcherModal });
  registerModal({ name: 'migratedBalance', component: MigratedBalanceModal });
  registerModal({ name: 'confirmAccountAccess', component: ConfirmAccountAccessModal });
  registerModal({ name: 'confirmContractCall', component: ConfirmContractCallModal, hidePage: true });
  registerModal({ name: 'confirmContractDeploy', component: ConfirmContractDeployModal, hidePage: true });
  registerModal({ name: 'confirmSign', component: ConfirmSignModal, hidePage: true });
  registerModal({ name: 'confirmSpend', component: ConfirmSpendModal, hidePage: true });
} else {
  registerModal({ name: 'confirmLedgerAddress', component: LedgerAddressConfirmModal });
  registerModal({ name: 'getLedgerTransactionFee', component: LedgerTransactionFeeModal });
  registerModal({ name: 'confirmLedgerSignTransaction', component: LedgerSignTransactionConfirmModal });
  registerModal({ name: 'cancelSign', component: CancelSignModal });
}

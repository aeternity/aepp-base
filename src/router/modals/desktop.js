import { registerModal } from '../../store/plugins/ui/modals';
import LedgerAccountNotFoundModal from '../../components/desktop/LedgerAccountNotFoundModal.vue';
import LedgerAddressConfirmModal from '../../components/desktop/LedgerAddressConfirmModal.vue';
import LedgerAddressNotConfirmedModal from '../../components/desktop/LedgerAddressNotConfirmedModal.vue';
import LedgerRequestModal from '../../components/desktop/LedgerRequestModal.vue';
import LedgerRequestRetryModal from '../../components/desktop/LedgerRequestRetryModal.vue';
import LedgerSignTransactionModal from '../../components/desktop/LedgerSignTransactionModal.vue';
import LedgerTransactionFeeModal from '../../components/desktop/LedgerTransactionFeeModal.vue';
import CancelSignModal from '../../components/desktop/CancelSignModal.vue';

export default () => {
  registerModal({ name: 'ledgerAccountNotFound', component: LedgerAccountNotFoundModal });
  registerModal({ name: 'confirmLedgerAddress', component: LedgerAddressConfirmModal });
  registerModal({ name: 'ledgerAddressNotConfirmed', component: LedgerAddressNotConfirmedModal });
  registerModal({ name: 'ledgerRequest', component: LedgerRequestModal });
  registerModal({ name: 'retryLedgerRequest', component: LedgerRequestRetryModal });
  registerModal({ name: 'getLedgerTransactionFee', component: LedgerTransactionFeeModal });
  registerModal({ name: 'ledgerSignTransaction', component: LedgerSignTransactionModal });
  registerModal({ name: 'cancelSign', component: CancelSignModal });
};

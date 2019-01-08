import { registerModal } from './store/plugins/modals';
import QrCodeReader from './components/QrCodeReader.vue';
import LedgerAddressConfirmModal from './components/desktop/LedgerAddressConfirmModal.vue';
import LedgerSignTransactionConfirmModal from './components/desktop/LedgerSignTransactionConfirmModal.vue';
import LedgerTransactionFeeModal from './components/desktop/LedgerTransactionFeeModal.vue';

registerModal({ name: 'readQrCode', component: QrCodeReader, hidePage: true });

if (!process.env.IS_MOBILE_DEVICE) {
  registerModal({ name: 'confirmLedgerAddress', component: LedgerAddressConfirmModal });
  registerModal({ name: 'getLedgerTransactionFee', component: LedgerTransactionFeeModal });
  registerModal({ name: 'confirmLedgerSignTransaction', component: LedgerSignTransactionConfirmModal });
}

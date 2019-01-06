<template>
  <div class="app-desktop">
    <div v-show="!qrCodeReaderTask">
      <header-desktop />
      <div class="page">
        <router-view />
      </div>
      <sidebar-desktop />
      <footer-desktop :show-back-button="$route.name !== 'apps'" />
      <ledger-address-confirm-modal />
      <ledger-transaction-fee-modal />
      <ledger-sign-transaction-confirm-modal />
    </div>
    <qr-code-reader v-if="qrCodeReaderTask" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import HeaderDesktop from './components/desktop/Header.vue';
import SidebarDesktop from './components/desktop/Sidebar.vue';
import FooterDesktop from './components/desktop/FooterDesktop.vue';
import LedgerAddressConfirmModal from './components/desktop/LedgerAddressConfirmModal.vue';
import LedgerTransactionFeeModal from './components/desktop/LedgerTransactionFeeModal.vue';
import LedgerSignTransactionConfirmModal from './components/desktop/LedgerSignTransactionConfirmModal.vue';
import QrCodeReader from './components/QrCodeReader.vue';

export default {
  components: {
    HeaderDesktop,
    SidebarDesktop,
    FooterDesktop,
    LedgerAddressConfirmModal,
    LedgerTransactionFeeModal,
    LedgerSignTransactionConfirmModal,
    QrCodeReader,
  },
  computed: mapState({
    qrCodeReaderTask: ({ qrCodeReaderTask }) => qrCodeReaderTask,
  }),
};
</script>

<style scoped lang="scss">
.app-desktop {
  .page {
    max-width: 520px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>

<style lang="scss">
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

body {
  background: $color-neutral-positive-2;
  margin: 0;
}
</style>

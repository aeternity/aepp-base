<template>
  <div class="app-desktop">
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
</template>

<script>
import HeaderDesktop from './components/desktop/Header.vue';
import SidebarDesktop from './components/desktop/Sidebar.vue';
import FooterDesktop from './components/FooterDesktop.vue';
import LedgerAddressConfirmModal from './components/desktop/LedgerAddressConfirmModal.vue';
import LedgerTransactionFeeModal from './components/desktop/LedgerTransactionFeeModal.vue';
import LedgerSignTransactionConfirmModal from './components/desktop/LedgerSignTransactionConfirmModal.vue';

export default {
  components: {
    HeaderDesktop,
    SidebarDesktop,
    FooterDesktop,
    LedgerAddressConfirmModal,
    LedgerTransactionFeeModal,
    LedgerSignTransactionConfirmModal,
  },
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

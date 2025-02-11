<template>
  <LedgerModal :title="$t('ledger.modal.sign-transaction')" class="ledger-sign-transaction">
    <LedgerModalNanoS />

    <AeSpinner />

    <ModalHeader>
      {{ $t('ledger.modal.sign-transaction') }}
    </ModalHeader>
  </LedgerModal>
</template>

<script>
import LedgerModal from './LedgerModal.vue';
import AeSpinner from '../AeSpinner.vue';
import LedgerModalNanoS from './LedgerModalNanoS.vue';
import ModalHeader from './ModalHeader.vue';

export default {
  components: {
    LedgerModal,
    AeSpinner,
    LedgerModalNanoS,
    ModalHeader,
  },
};
</script>

<style lang="scss" scoped>
@use '../../styles/functions';

.ledger-sign-transaction .ae-spinner {
  display: block;
  margin: functions.rem(60px) auto;
}
</style>

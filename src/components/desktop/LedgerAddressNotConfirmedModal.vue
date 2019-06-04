<template>
  <LedgerModal
    title="Address not confirmed"
    class="ledger-address-not-confirmed"
  >
    <LedgerModalNanoS />

    <LedgerModalNote fill="dark">
      The Ledger cannot be used without address confirmation.
      Address mismatch can happen due to malware software.
      Please contact support to resolve this.
    </LedgerModalNote>

    <AeButton
      slot="footer"
      size="small"
      plain
      @click="resolve"
    >
      Close
    </AeButton>
  </LedgerModal>
</template>

<script>
import LedgerModal from './LedgerModal.vue';
import LedgerModalNanoS from './LedgerModalNanoS.vue';
import LedgerModalNote from './LedgerModalNote.vue';
import AeButton from '../AeButton.vue';

export default {
  components: {
    LedgerModal,
    LedgerModalNanoS,
    LedgerModalNote,
    AeButton,
  },
  props: {
    resolve: { type: Function, required: true },
  },
};
</script>

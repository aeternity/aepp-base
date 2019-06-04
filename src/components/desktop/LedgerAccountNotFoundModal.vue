<template>
  <LedgerModal title="Account not found">
    <LedgerModalNanoS />

    <LedgerModalNote fill="dark">
      The connected Ledger does not hold the specified account.
      You can still use it, but you have to create a new account.
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

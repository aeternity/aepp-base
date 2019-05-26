<template>
  <LedgerModal
    title="Request failed"
    class="ledger-request-retry"
    closable
    @close="handleCancel"
  >
    <LedgerModalNanoS />

    <LedgerModalNote fill="dark">
      Ledger is not connected or the request was not confirmed.
    </LedgerModalNote>

    <template slot="footer">
      <AeButton
        size="small"
        plain
        @click="handleCancel"
      >
        Cancel
      </AeButton>

      <AeButton
        size="small"
        plain
        @click="resolve"
      >
        Try again
      </AeButton>
    </template>
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
    reject: { type: Function, required: true },
  },
  methods: {
    handleCancel() {
      this.reject(new Error('Canceled by user'));
    },
  },
};
</script>

<style lang="scss" scoped>
.ledger-request-retry.ledger-modal /deep/ footer {
  display: flex;
  justify-content: space-between;
}
</style>

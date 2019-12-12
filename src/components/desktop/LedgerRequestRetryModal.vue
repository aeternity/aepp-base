<template>
  <LedgerModal
    :title="$t('ledger.modal.request-retry.title')"
    class="ledger-request-retry"
    closable
    @close="handleCancel"
  >
    <LedgerModalNanoS />

    <LedgerModalNote fill="dark">
      {{ $t('ledger.modal.request-retry.note') }}
    </LedgerModalNote>

    <template slot="footer">
      <AeButton
        size="small"
        plain
        @click="handleCancel"
      >
        {{ $t('cancel') }}
      </AeButton>

      <AeButton
        size="small"
        plain
        @click="resolve"
      >
        {{ $t('ledger.modal.request-retry.try') }}
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
.ledger-request-retry.ledger-modal ::v-deep footer {
  display: flex;
  justify-content: space-between;
}
</style>

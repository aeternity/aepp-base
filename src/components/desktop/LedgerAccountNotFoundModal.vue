<template>
  <LedgerModal :title="$t('ledger.modal.account-not-found.title')">
    <LedgerModalNanoS />

    <LedgerModalNote fill="dark">
      {{ $t('ledger.modal.account-not-found.note') }}
    </LedgerModalNote>

    <AeButton slot="footer" size="small" plain @click="resolve">
      {{ $t('close') }}
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

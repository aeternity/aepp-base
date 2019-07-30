<template>
  <LedgerModal
    :title="create
      ? $t('ledger.modal.address-confirm.create-guide')
      : $t('ledger.modal.address-confirm.confirm-guide')"
    class="ledger-address-confirm"
  >
    <LedgerModalNanoS />

    <AeAddressPanel
      :title="$t('ledger.modal.address-confirm.address')"
      :address="address"
    />

    <LedgerModalNote>
      {{ create
        ? $t('ledger.modal.address-confirm.create-note')
        : $t('ledger.modal.address-confirm.confirm-note') }}
    </LedgerModalNote>
  </LedgerModal>
</template>

<script>
import LedgerModal from './LedgerModal.vue';
import AeAddressPanel from './AeAddressPanel.vue';
import LedgerModalNanoS from './LedgerModalNanoS.vue';
import LedgerModalNote from './LedgerModalNote.vue';

export default {
  components: {
    LedgerModal,
    AeAddressPanel,
    LedgerModalNanoS,
    LedgerModalNote,
  },
  props: {
    create: Boolean,
    address: { type: String, required: true },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/globals/functions.scss';

.ledger-address-confirm {
  .ae-address-panel {
    margin: rem(60px) auto;
  }
}
</style>

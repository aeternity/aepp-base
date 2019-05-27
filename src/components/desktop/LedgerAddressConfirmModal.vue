<template>
  <LedgerModal
    :title="`${create ? 'Create' : 'Confirm'} your address on the Ledger`"
    class="ledger-address-confirm"
  >
    <LedgerModalNanoS />

    <AeAddressPanel
      title="Ledger Address"
      :address="address"
    />

    <LedgerModalNote>
      {{
        create
          ? 'To create a new account on your Ledger, confirm your address there first'
          : 'To proceed, confirm your address on the Ledger'
      }}
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
    create: { type: Boolean, default: false },
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

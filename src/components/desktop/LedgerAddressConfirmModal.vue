<template>
  <ledger-modal
    v-if="address"
    :title="`${create ? 'Create' : 'Confirm'} your address on the Ledger`"
    class="ledger-address-confirm"
  >
    <ledger-modal-nano-s />

    <ae-address-panel
      title="Ledger Address"
      :address="address"
    />

    <ledger-modal-note>
      {{
        create
          ? 'To create a new account on your Ledger, confirm your address there first'
          : 'To proceed, confirm your address on the Ledger'
      }}
    </ledger-modal-note>
  </ledger-modal>
</template>

<script>
import { mapState } from 'vuex';
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
  },
  computed: mapState({
    address: ({ desktop: { showConfirmModalForAddress } }) => showConfirmModalForAddress,
  }),
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';

.ledger-address-confirm {
  .ae-address-panel {
    margin: rem(60px) auto;
  }
}
</style>

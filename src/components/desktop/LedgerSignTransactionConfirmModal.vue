<template>
  <ledger-modal
    v-if="show"
    title="Sign transaction on the Ledger"
    class="sign-transaction-confirm"
  >
    <ledger-modal-nano-s />

    <ae-loader />

    <div class="confirm">
      Sign the transaction on the Ledger
    </div>
  </ledger-modal>
</template>

<script>
import { mapState } from 'vuex';
import LedgerModal from './LedgerModal.vue';
import AeLoader from '../AeLoader.vue';
import LedgerModalNanoS from './LedgerModalNanoS.vue';

export default {
  components: {
    LedgerModal,
    AeLoader,
    LedgerModalNanoS,
  },
  computed: mapState({
    show: ({ desktop }) => desktop.showLedgerSignTransactionConfirmModal,
  }),
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';

.sign-transaction-confirm {
  .ae-loader {
    display: block;
    margin: rem(60px) auto;
  }

  .confirm {
    @extend %face-sans-l;
    font-weight: 500;
    color: $color-neutral-minimum;
    text-align: center;
  }
}
</style>

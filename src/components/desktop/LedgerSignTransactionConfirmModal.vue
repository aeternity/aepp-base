<template>
  <ledger-modal
    title="Sign transaction on the Ledger"
    class="sign-transaction-confirm"
  >
    <ledger-modal-nano-s />

    <ae-loader />

    <div class="confirm">
      Confirm the address
    </div>
    <ledger-modal-note>
      And we will import the it and connected to the
      <br>account you just created.
    </ledger-modal-note>
  </ledger-modal>
</template>

<script>
import LedgerModal from './LedgerModal.vue';
import AeLoader from '../AeLoader.vue';
import LedgerModalNanoS from './LedgerModalNanoS.vue';
import LedgerModalNote from './LedgerModalNote.vue';

export default {
  components: {
    LedgerModal,
    AeLoader,
    LedgerModalNanoS,
    LedgerModalNote,
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';

.sign-transaction-confirm {
  .ae-loader {
    display: block;
    margin: rem(30px) auto;
  }

  .confirm {
    margin: rem(10px);
    @extend %face-sans-l;
    font-weight: 500;
    color: $color-neutral-minimum;
    text-align: center;
  }
}
</style>

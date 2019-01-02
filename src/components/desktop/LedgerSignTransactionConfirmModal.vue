<template>
  <ledger-modal
    title="Sign transaction on the Ledger"
    class="sign-transaction-confirm"
  >
    <div class="ledger-image" />

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
import LedgerModalNote from './LedgerModalNote.vue';

export default {
  components: {
    LedgerModal,
    AeLoader,
    LedgerModalNote,
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';

.sign-transaction-confirm {
  .ledger-image {
    background: #333745;
    width: rem(220px);
    height: rem(50px);
    margin: rem(60px) auto;
  }

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

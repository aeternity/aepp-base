<template>
  <LedgerModal
    title="Sign transaction on the Ledger"
    class="sign-transaction-confirm"
  >
    <LedgerModalNanoS />

    <AeLoader />

    <div class="confirm">
      Sign the transaction on the Ledger
    </div>
  </LedgerModal>
</template>

<script>
import LedgerModal from './LedgerModal.vue';
import AeLoader from '../AeLoader.vue';
import LedgerModalNanoS from './LedgerModalNanoS.vue';

export default {
  components: {
    LedgerModal,
    AeLoader,
    LedgerModalNanoS,
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables/colors.scss';
@import '../../styles/placeholders/typography.scss';

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

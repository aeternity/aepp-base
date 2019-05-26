<template>
  <LedgerModal
    title="Sending request to the Ledger"
    class="ledger-request"
  >
    <LedgerModalNanoS />

    <AeLoader />

    <div class="label">
      Sending request to the Ledger
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

.ledger-request {
  .ae-loader {
    display: block;
    margin: rem(60px) auto;
  }

  .label {
    @extend %face-sans-l;
    font-weight: 500;
    color: $color-neutral-minimum;
    text-align: center;
  }
}
</style>

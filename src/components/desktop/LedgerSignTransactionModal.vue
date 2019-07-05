<template>
  <LedgerModal
    :title="$t('ledger.modal.sign-transaction')"
    class="ledger-sign-transaction"
  >
    <LedgerModalNanoS />

    <AeLoader />

    <div class="confirm">
      {{ $t('ledger.modal.sign-transaction') }}
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

.ledger-sign-transaction {
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

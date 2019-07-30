<template>
  <LedgerModal
    :title="$t('ledger.modal.sign-transaction')"
    class="ledger-sign-transaction"
  >
    <LedgerModalNanoS />

    <AeLoader />

    <ModalHeader>
      {{ $t('ledger.modal.sign-transaction') }}
    </ModalHeader>
  </LedgerModal>
</template>

<script>
import LedgerModal from './LedgerModal.vue';
import AeLoader from '../AeLoader.vue';
import LedgerModalNanoS from './LedgerModalNanoS.vue';
import ModalHeader from './ModalHeader.vue';

export default {
  components: {
    LedgerModal,
    AeLoader,
    LedgerModalNanoS,
    ModalHeader,
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/globals/functions.scss';

.ledger-sign-transaction .ae-loader {
  display: block;
  margin: rem(60px) auto;
}
</style>

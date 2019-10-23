<template>
  <LedgerModal
    :title="$t('ledger.modal.request')"
    class="ledger-request"
  >
    <LedgerModalNanoS />

    <AeLoader />

    <ModalHeader>
      {{ $t('ledger.modal.request') }}
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
@import '../../styles/functions';

.ledger-request .ae-loader {
  display: block;
  margin: rem(60px) auto;
}
</style>

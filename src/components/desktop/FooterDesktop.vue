<template>
  <FooterModal>
    <WaitingForConfirmation v-if="!ledgerConnected && transactionToSignByRemote" />
  </FooterModal>
</template>

<script>
import { mapState } from 'vuex';
import FooterModal from './FooterModal.vue';
import WaitingForConfirmation from './WaitingForConfirmation.vue';

export default {
  components: {
    FooterModal,
    WaitingForConfirmation,
  },
  props: {
    showBackButton: { type: Boolean, default: false },
  },
  computed: {
    ...mapState({
      ledgerConnected: ({ desktop }) => desktop.ledgerConnected,
      transactionToSignByRemote: ({ desktop }) => desktop.transactionToSignByRemote,
    }),
  },
};
</script>

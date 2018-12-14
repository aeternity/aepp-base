<template>
  <footer-modal>
    <waiting-for-confirmation v-if="transactionToSignByRemote" />
  </footer-modal>
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
      transactionToSignByRemote: ({ desktop }) => desktop.transactionToSignByRemote,
    }),
  },
};
</script>

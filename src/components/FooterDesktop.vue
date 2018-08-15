<template>
  <footer-modal
    :show-back-button="showBackButton"
    :closable="!transactionToSignByRemote"
    @toggle="toggleDesktopFooter"
  >
    <remote-connection-prompt v-if="showRemoteConnectionPrompt" />
    <waiting-for-confirmation v-if="transactionToSignByRemote" />
    <accounts-horizontal v-if="showIdManager" />
  </footer-modal>
</template>

<script>
import { mapState } from 'vuex';
import FooterModal from './FooterModal.vue';
import AccountsHorizontal from './AccountsHorizontal.vue';
import RemoteConnectionPrompt from './RemoteConnectionPrompt.vue';
import WaitingForConfirmation from './WaitingForConfirmation.vue';

export default {
  components: {
    FooterModal,
    AccountsHorizontal,
    RemoteConnectionPrompt,
    WaitingForConfirmation,
  },
  props: {
    showBackButton: { type: Boolean, default: false },
  },
  computed: {
    ...mapState(['showIdManager']),
    ...mapState({
      showRemoteConnectionPrompt: ({ desktop }) => desktop.showRemoteConnectionPrompt,
      transactionToSignByRemote: ({ desktop }) => desktop.transactionToSignByRemote,
    }),
  },
  methods: {
    toggleDesktopFooter() {
      if (this.transactionToSignByRemote) return;
      this.$store.commit(`toggle${this.$store.getters.loggedIn
        ? 'IdManager' : 'RemoteConnectionPrompt'}`);
    },
  },
};
</script>

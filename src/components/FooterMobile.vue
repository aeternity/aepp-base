<template>
  <div>
    <quick-id />
    <div
      v-if="messageToApprove || transactionToApprove"
      class="modal-dialogs-wrapper"
    >
      <approve-message
        v-if="messageToApprove"
        v-bind="messageToApprove"
      />
      <approve-transaction
        v-if="transactionToApprove"
        v-bind="transactionToApprove"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import QuickId from './QuickId.vue';
import ApproveMessage from './ApproveMessage.vue';
import ApproveTransaction from './ApproveTransaction.vue';

export default {
  components: {
    QuickId, ApproveMessage, ApproveTransaction,
  },
  computed: {
    ...mapState({
      messageToApprove: ({ mobile }) => mobile.messageToApprove,
      transactionToApprove: ({ mobile }) => Object.values(mobile.transactionsToApprove)[0],
    }),
  },
};
</script>

<style lang="scss" scoped>
.modal-dialogs-wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-image: linear-gradient(to bottom, rgba(30,30,30,.9), rgba(50, 10, 60, .9));
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000000;
}
</style>

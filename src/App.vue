<template>
  <div id="app">
    <router-view
      v-show="!qrCodeReaderTask"
      :class="{ grayscale }"
    />
    <qr-code-reader v-if="qrCodeReaderTask" />
    <ae-banner v-if="notification">
      <img
        v-if="notification.icon"
        :src="notification.icon"
      >
      {{ notification.text }}
      <ae-button
        v-if="notification.action"
        slot="right"
        plain
        uppercase
        type="exciting"
        size="small"
        @click="notification.action.handler"
      >
        {{ notification.action.name }}
      </ae-button>
    </ae-banner>

    <account-switcher />
    <tab-bar v-if="$route.meta.displayFooter" />
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

    <remove-app-modal />
    <alert-modal />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { AeBanner, AeButton } from '@aeternity/aepp-components';
import RemoveAppModal from './components/RemoveAppModal.vue';
import AlertModal from './components/AlertModal.vue';
import QrCodeReader from './components/QrCodeReader.vue';
import TabBar from './components/mobile/TabBar.vue';
import ApproveMessage from './components/ApproveMessage.vue';
import ApproveTransaction from './components/ApproveTransaction.vue';
import AccountSwitcher from './components/AccountSwitcher.vue';

export default {
  components: {
    QrCodeReader,
    AeBanner,
    AeButton,
    RemoveAppModal,
    AlertModal,
    TabBar,
    ApproveMessage,
    ApproveTransaction,
    AccountSwitcher,
  },
  computed: mapState({
    notification: ({ notification }) => notification,
    grayscale: ({ mobile: { showAccountSwitcher } }) => showAccountSwitcher,
    qrCodeReaderTask: ({ qrCodeReaderTask }) => qrCodeReaderTask,
    messageToApprove: ({ mobile }) => mobile.messageToApprove,
    transactionToApprove: ({ mobile }) => Object.values(mobile.transactionsToApprove)[0],
  }),
  created() {
    // set domain to base host because of iframe cross domain policy, very nice hardcoded urls
    if (document.domain.includes('aepps.com')) {
      document.domain = 'aepps.com';
    } else if (document.domain.includes('aepps.dev')) {
      document.domain = 'aepps.dev';
    }
  },
};
</script>

<style scoped lang="scss">
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  /deep/ .grayscale {
    filter: grayscale(100%);
  }

  .ae-banner {
    position: fixed;
    left: 0;
    right: 0;
    z-index: auto;

    img {
      height: 22px;
      margin-right: 4px;
      vertical-align: text-bottom;
    }
  }

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
}
</style>

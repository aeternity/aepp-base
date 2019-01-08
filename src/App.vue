<template>
  <div id="app">
    <router-view
      v-show="!hidePage"
      :class="{ grayscale }"
    />
    <component
      :is="component"
      v-bind="props"
    />

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
    <tab-bar v-if="$route.meta.displayFooter && !hidePage" />
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
import { mapState, mapGetters } from 'vuex';
import { AeBanner, AeButton } from '@aeternity/aepp-components';
import RemoveAppModal from './components/RemoveAppModal.vue';
import AlertModal from './components/AlertModal.vue';
import TabBar from './components/mobile/TabBar.vue';
import ApproveMessage from './components/mobile/ApproveMessage.vue';
import ApproveTransaction from './components/mobile/ApproveTransaction.vue';
import AccountSwitcher from './components/mobile/AccountSwitcher.vue';

export default {
  components: {
    AeBanner,
    AeButton,
    RemoveAppModal,
    AlertModal,
    TabBar,
    ApproveMessage,
    ApproveTransaction,
    AccountSwitcher,
  },
  computed: {
    ...mapState({
      notification: ({ notification }) => notification,
      grayscale: ({ mobile: { showAccountSwitcher } }) => showAccountSwitcher,
      messageToApprove: ({ mobile }) => mobile.messageToApprove,
      transactionToApprove: ({ mobile }) => Object.values(mobile.transactionsToApprove)[0],
    }),
    ...mapGetters('modals', ['component', 'hidePage', 'props']),
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

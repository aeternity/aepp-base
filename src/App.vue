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
import AccountSwitcher from './components/mobile/AccountSwitcher.vue';

export default {
  components: {
    AeBanner,
    AeButton,
    RemoveAppModal,
    AlertModal,
    TabBar,
    AccountSwitcher,
  },
  computed: {
    ...mapState({
      notification: ({ notification }) => notification,
      grayscale: ({ mobile: { showAccountSwitcher } }) => showAccountSwitcher,
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
}
</style>

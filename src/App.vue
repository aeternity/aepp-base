<template>
  <div id="app">
    <RouterView
      v-show="!hidePage"
      :class="{ grayscale }"
    />
    <Component
      :is="component"
      v-bind="props"
    />

    <AeBanner v-if="notification">
      <img
        v-if="notification.icon"
        :src="notification.icon"
      >
      {{ notification.text }}
    </AeBanner>

    <AccountSwitcher />
    <TabBar v-if="$route.meta.displayFooter && !hidePage" />

    <AlertModal />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { AeBanner } from '@aeternity/aepp-components';
import AlertModal from './components/AlertModal.vue';
import TabBar from './components/mobile/TabBar.vue';
import AccountSwitcher from './components/mobile/AccountSwitcher.vue';

export default {
  components: {
    AeBanner,
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
@import '~@aeternity/aepp-components-3/src/styles/variables/typography.scss';

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
    font-family: $font-sans;

    img {
      height: 22px;
      margin-right: 4px;
      vertical-align: text-bottom;
    }
  }
}
</style>

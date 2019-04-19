<template>
  <div id="app">
    <RouterView
      v-show="!hidePage"
      :class="{ grayscale: component }"
    />
    <TabBar
      v-if="$route.meta.displayFooter && !hidePage"
      :class="{ grayscale: component }"
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

    <AlertModal />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { AeBanner } from '@aeternity/aepp-components-3';
import AlertModal from './components/AlertModal.vue';
import TabBar from './components/mobile/TabBar.vue';

export default {
  components: {
    AeBanner,
    AlertModal,
    TabBar,
  },
  computed: {
    ...mapState(['notification']),
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
  min-height: 100%;

  /deep/ .grayscale {
    filter: grayscale(100%);
  }

  .ae-banner {
    position: fixed;
    top: 0;
    top: env(safe-area-inset-top);
    left: 0;
    right: 0;
    z-index: auto;
    font-family: $font-sans;

    img {
      height: 22px;
      margin-right: 4px;
      vertical-align: text-bottom;
    }

    /deep/ main {
      overflow: hidden;
      overflow-wrap: break-word;
    }
  }
}
</style>

<style lang="scss">
html, body {
  height: 1px;
  min-height: 100%;
}
</style>

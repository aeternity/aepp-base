<template>
  <div id="app">
    <RouterView
      v-show="!hidePage"
      :class="{ grayscale: openedModals.length }"
    />

    <Component
      :is="component"
      v-for="{ component, key, props } in openedModals"
      :key="key"
      v-bind="props"
    />

    <Notification v-if="notification">
      {{ notification.text }}
    </Notification>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Notification from './components/Notification.vue';

export default {
  components: { Notification },
  computed: {
    ...mapState(['notification']),
    ...mapState('modals', {
      openedModals: (state, { opened }) => opened,
      hidePage: (state, { opened }) => opened.some(({ hidePage }) => hidePage),
    }),
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
}
</style>

<style lang="scss">
html, body {
  height: 1px;
  min-height: 100%;
}
</style>

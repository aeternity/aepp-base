<template>
  <div id="app">
    <RouterView
      v-show="!hidePage"
      :class="{ grayscale: grayscalePage }"
    />

    <Component
      :is="component"
      v-for="{ component, key, props } in opened"
      :key="key"
      v-bind="props"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { IS_IOS } from './lib/constants';

export default {
  computed: mapGetters('modals', ['opened', 'hidePage', 'grayscalePage']),
  mounted() {
    document.documentElement.style.setProperty(
      '--height',
      process.env.VUE_APP_CORDOVA && IS_IOS ? '100vh' : '100%',
    );
  },
};
</script>

<style scoped lang="scss">
#app {
  display: flex;
  flex-direction: column;
  min-height: 100%;

  ::v-deep .grayscale {
    filter: grayscale(100%);
  }
}
</style>

<style lang="scss">
html, body {
  height: var(--height);
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

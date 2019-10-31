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

export default {
  computed: mapGetters('modals', ['opened', 'hidePage', 'grayscalePage']),
};
</script>

<style scoped lang="scss">
#app {
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

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

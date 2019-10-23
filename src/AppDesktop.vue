<template>
  <div class="app-desktop">
    <div v-show="!hidePage">
      <HeaderDesktop />
      <div class="page">
        <RouterView />
      </div>
      <SidebarDesktop />
    </div>

    <Component
      :is="component"
      v-for="{ component, key, props } in opened"
      :key="key"
      v-bind="props"
    />
    <ConnectionStatus />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HeaderDesktop from './components/desktop/Header.vue';
import SidebarDesktop from './components/desktop/Sidebar.vue';
import ConnectionStatus from './components/ConnectionStatus.vue';

export default {
  components: {
    HeaderDesktop,
    SidebarDesktop,
    ConnectionStatus,
  },
  computed: mapGetters('modals', ['opened', 'hidePage']),
};
</script>

<style scoped lang="scss">
.app-desktop {
  .page {
    max-width: 520px;
    margin-left: auto;
    margin-right: auto;
  }

  .connection-status {
    position: fixed;
    bottom: 0;
    right: 0;
  }
}
</style>

<style lang="scss">
@import 'styles/variables';

body {
  background: $color-neutral-positive-2;
}
</style>

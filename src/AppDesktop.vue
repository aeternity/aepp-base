<template>
  <div class="app-desktop">
    <div v-show="!hidePage">
      <HeaderDesktop />
      <div class="desktop-page">
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
  .desktop-page {
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
@use 'styles/variables';

body {
  background: variables.$color-neutral-positive-2;
}
</style>

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
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HeaderDesktop from './components/desktop/Header.vue';
import SidebarDesktop from './components/desktop/Sidebar.vue';

export default {
  components: {
    HeaderDesktop,
    SidebarDesktop,
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
}
</style>

<style lang="scss">
@import './styles/variables/colors.scss';

body {
  background: $color-neutral-positive-2;
  margin: 0;
}
</style>

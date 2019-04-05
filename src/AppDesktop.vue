<template>
  <div class="app-desktop">
    <div v-show="!hidePage">
      <HeaderDesktop />
      <div class="page">
        <RouterView />
      </div>
      <SidebarDesktop />
      <FooterDesktop :show-back-button="$route.name !== 'apps'" />
    </div>
    <Component
      :is="component"
      v-bind="props"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HeaderDesktop from './components/desktop/Header.vue';
import SidebarDesktop from './components/desktop/Sidebar.vue';
import FooterDesktop from './components/desktop/FooterDesktop.vue';

export default {
  components: {
    HeaderDesktop,
    SidebarDesktop,
    FooterDesktop: process.env.UNFINISHED_FEATURES ? FooterDesktop : () => {},
  },
  computed: mapGetters('modals', ['component', 'hidePage', 'props']),
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
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

body {
  background: $color-neutral-positive-2;
  margin: 0;
}
</style>

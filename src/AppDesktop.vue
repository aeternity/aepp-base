<template>
  <div class="app-desktop">
    <header-desktop />
    <div class="page">
      <router-view />
    </div>
    <footer-desktop :show-back-button="$route.name !== 'apps'" />
  </div>
</template>

<script>
import HeaderDesktop from './components/desktop/Header.vue';
import FooterDesktop from './components/FooterDesktop.vue';

export default {
  components: {
    HeaderDesktop,
    FooterDesktop,
  },
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

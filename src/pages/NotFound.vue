<template>
  <component
    :is="wrapper"
    class="not-found"
    :hide-tab-bar="!loggedIn"
  >
    Page not found
  </component>
</template>

<script>
import { mapGetters } from 'vuex';
import MobilePage from '../components/mobile/Page.vue';

export default {
  data: () => ({
    wrapper: process.env.IS_MOBILE_DEVICE ? MobilePage : 'div',
  }),
  computed: mapGetters(['loggedIn']),
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';

.not-found {
  @extend %face-sans-l;
}
</style>

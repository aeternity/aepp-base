<template>
  <Component
    :is="wrapper"
    class="not-found"
    :hide-tab-bar="!loggedIn"
  >
    It looks like the page you are looking for was not found.

    <AeButton
      v-if="!loggedIn && $globals.IS_MOBILE_DEVICE"
      slot="footer"
      :to="{ name: 'intro' }"
    >
      Go home
    </AeButton>
  </Component>
</template>

<script>
import { mapGetters } from 'vuex';
import MobilePage from '../components/mobile/Page.vue';
import AeButton from '../components/AeButton.vue';

export default {
  components: { AeButton },
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
  text-align: center;
}
</style>

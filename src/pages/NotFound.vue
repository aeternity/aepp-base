<template>
  <Component :is="wrapper" class="not-found" :hide-tab-bar="!loggedIn">
    {{ $t('not-found.note') }}

    <AeButton v-if="!loggedIn && $globals.ENV_MOBILE_DEVICE" slot="footer" :to="{ name: 'intro' }">
      {{ $t('not-found.to-home') }}
    </AeButton>
  </Component>
</template>

<script>
import { mapGetters } from 'vuex';
import Page from '../components/Page.vue';
import AeButton from '../components/AeButton.vue';

export default {
  components: { AeButton },
  data: () => ({
    wrapper: ENV_MOBILE_DEVICE ? Page : 'div',
  }),
  computed: mapGetters(['loggedIn']),
};
</script>

<style lang="scss" scoped>
@use '../styles/typography';

.not-found {
  @extend %face-sans-l;
  text-align: center;
}
</style>

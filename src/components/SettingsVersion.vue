<template>
  <div class="settings-version">
    {{ $t('settings.version') }}
    <!-- eslint-disable vue/multiline-html-element-content-newline -->
    <AeLink :to="`https://github.com/aeternity/aepp-base/releases/tag/v${version}`">{{
      version
    }}</AeLink>
    <!-- eslint-disable @intlify/vue-i18n/no-raw-text -->
    {{ ' ' }}
    (<AeLink :to="`https://github.com/aeternity/aepp-base/commit/${revision}`">{{
      revision.slice(0, 7)
    }}</AeLink>)
    <!-- eslint-enable @intlify/vue-i18n/no-raw-text -->
    <!-- eslint-enable vue/multiline-html-element-content-newline -->
  </div>
</template>

<script>
import AeLink from './AeLink.vue';

export default {
  components: { AeLink },
  data: () => ({
    version: process.env.VUE_APP_VERSION,
    revision: process.env.VUE_APP_REVISION,
  }),
};
</script>

<style lang="scss">
@use '../styles/variables';
@use '../styles/functions';
@use '../styles/typography';

.settings-version {
  margin: functions.rem(24px) 0;
  @extend %face-sans-s;
  text-align: center;

  &, a {
    color: variables.$color-neutral-negative-1;
  }
}
</style>

<template>
  <div class="settings-version">
    {{ $t('settings.version') }} {{ version }}
  </div>
</template>

<script>
export default {
  data: () => ({
    version: process.env.VUE_APP_VERSION,
  }),
};
</script>

<style lang="scss">
@import '../styles/typography';

.settings-version {
  margin: rem(24px) 0;
  @extend %face-sans-s;
  color: $color-neutral-negative-1;
  text-align: center;
}
</style>

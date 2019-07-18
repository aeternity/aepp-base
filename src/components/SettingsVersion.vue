<template>
  <div class="settings-version">
    {{ $t('settings.version') }} {{ version }}
  </div>
</template>

<script>
export default {
  data: () => ({
    version: process.env.npm_package_version,
  }),
};
</script>

<style lang="scss">
@import '../styles/placeholders/typography.scss';
@import '../styles/variables/colors.scss';

.settings-version {
  margin: rem(24px) 0;
  @extend %face-sans-s;
  color: $color-neutral-negative-1;
  text-align: center;
}
</style>

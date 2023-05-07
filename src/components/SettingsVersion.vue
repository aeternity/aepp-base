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
@use '../styles/variables';
@use '../styles/functions';
@use '../styles/typography';

.settings-version {
  margin: functions.rem(24px) 0;
  @extend %face-sans-s;
  color: variables.$color-neutral-negative-1;
  text-align: center;
}
</style>

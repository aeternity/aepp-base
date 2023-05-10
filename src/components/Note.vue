<template>
  <div class="note">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/variables';
@use '../styles/functions';
@use '../styles/typography';

.note {
  margin-bottom: functions.rem(50px);
  @extend %face-sans-xs;
  line-height: 1.46;
  color: variables.$color-neutral-minimum;
}
</style>

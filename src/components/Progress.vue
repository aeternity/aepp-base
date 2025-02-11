<template>
  <progress class="progress" v-bind="$attrs" />
</template>

<style lang="scss" scoped>
@use '../styles/functions';

.progress {
  -webkit-appearance: none;
  -moz-appearance: none;
  height: functions.rem(2px);
  border: none;
  color: variables.$color-magenta;

  @each $name in ('', '::-webkit-progress-bar') {
    &#{$name} {
      background-color: variables.$color-neutral-positive-1;
    }
  }

  @each $name in (-webkit-progress-value, -moz-progress-bar) {
    &::#{$name} {
      background-color: variables.$color-magenta;
    }
  }
}
</style>

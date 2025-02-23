<template>
  <input
    class="ae-input-range"
    :class="[fill]"
    :value="value"
    v-bind="$attrs"
    type="range"
    @input="$emit($event.type, +$event.target.value)"
  />
</template>

<script>
export default {
  props: {
    value: { type: [String, Number], default: '' },
    fill: {
      type: String,
      validator: (value) => ['primary', 'light'].includes(value),
      default: 'primary',
    },
  },
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../styles/variables';
@use '../styles/functions';

.ae-input-range {
  -webkit-appearance: none;
  width: 100%;
  cursor: pointer;
  background: transparent;

  $colors: (
    primary: (
      track-color: variables.$color-neutral-positive-1,
      progress-color: variables.$color-primary,
      thumb-color: variables.$color-primary,
    ),
    light: (
      track-color: rgba(#fff, 0.66846),
      progress-color: variables.$color-neutral-maximum,
      thumb-color: variables.$color-neutral-maximum,
    ),
  );

  @mixin range-track($background-color) {
    width: 100%;
    height: functions.rem(2px);
    background: $background-color;
  }

  @each $fill, $colors in $colors {
    &.#{$fill} {
      @each $name in (-webkit-slider-runnable-track, -moz-range-track, -ms-track, -ms-fill-upper) {
        &::#{$name} {
          @include range-track(map.get($colors, track-color));
        }
      }

      @each $name in -moz-range-progress -ms-fill-lower {
        &::#{$name} {
          @include range-track(map.get($colors, progress-color));
        }
      }

      @each $name in -webkit-slider-thumb -moz-range-thumb -ms-thumb {
        &::#{$name} {
          height: functions.rem(15px);
          width: functions.rem(15px);
          border-radius: functions.rem(48px);
          background: map.get($colors, thumb-color);
          box-shadow: 0 0 functions.rem(8px) variables.$color-shadow-alpha-15;
          cursor: pointer;
        }
      }
    }
  }

  &:focus:not([data-focus-visible-added]) {
    outline: none;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    margin-top: functions.rem(-6px);
    border: none;
  }

  &::-moz-range-thumb {
    border: none;
  }

  &::-ms-track {
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
}
</style>

<template>
  <input
    class="range"
    :min="min"
    :max="max"
    :value="value"
    type="range"
    @input="$emit($event.type, +$event.target.value)"
  >
</template>

<script>
export default {
  props: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      default: undefined,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

@mixin range-track() {
  width: 100%;
  height: rem(2px);
  background: $color-primary-positive-1;
}

@mixin range-thumb() {
  height: rem(15px);
  width: rem(15px);
  border-radius: rem(48px);
  background: $color-neutral-maximum;
  cursor: pointer;
}

.range {
  -webkit-appearance: none;
  width: 100%;
  cursor: pointer;

  &:focus:not([data-focus-visible-added]) {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    @include range-track;
  }

  &::-moz-range-track {
    @include range-track;
  }

  &::-ms-track {
    @include range-track;
  }

  &::-ms-fill-lower {
    @include range-track;
  }

  &::-ms-fill-upper {
    @include range-track;
  }

  &::-ms-track {
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  &::-webkit-slider-thumb {
    @include range-thumb;
    -webkit-appearance: none;
    margin-top: rem(-6px);
  }

  &::-moz-range-thumb {
    @include range-thumb;
  }

  &::-ms-thumb  {
    @include range-thumb;
  }
}
</style>

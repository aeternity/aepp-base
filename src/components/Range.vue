<template>
  <input
    :class="['range', fill]"
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
    fill: {
      type: String,
      validator: value => [
        '',
        'neutral',
      ].includes(value),
      default: '',
    },
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

@mixin range-track($background-color) {
  width: 100%;
  height: rem(2px);
  background: $background-color;
}

@mixin range-thumb($background-color) {
  height: rem(15px);
  width: rem(15px);
  border-radius: rem(48px);
  background: $background-color;
  cursor: pointer;
}

.range {
  &::-webkit-slider-runnable-track {
    @include range-track($color-neutral-positive-1);
  }

  &::-moz-range-track {
    @include range-track($color-neutral-positive-1);
  }

  &::-ms-track {
    @include range-track($color-neutral-positive-1);
  }

  &::-ms-fill-lower {
    @include range-track($color-neutral-positive-1);
  }

  &::-ms-fill-upper {
    @include range-track($color-neutral-positive-1);
  }

   &::-webkit-slider-thumb {
    @include range-thumb($color-primary);
  }

  &::-moz-range-thumb {
    @include range-thumb($color-primary);
  }

  &::-ms-thumb  {
    @include range-thumb($color-primary);
  }

  &.neutral {
    &::-webkit-slider-runnable-track {
      @include range-track($color-primary-positive-1);
    }

    &::-moz-range-track {
      @include range-track($color-primary-positive-1);
    }

    &::-ms-track {
      @include range-track($color-primary-positive-1);
    }

    &::-ms-fill-lower {
      @include range-track($color-primary-positive-1);
    }

    &::-ms-fill-upper {
      @include range-track($color-primary-positive-1);
    }

     &::-webkit-slider-thumb {
      @include range-thumb($color-neutral-maximum);
    }

    &::-moz-range-thumb {
      @include range-thumb($color-neutral-maximum);
    }

    &::-ms-thumb  {
      @include range-thumb($color-neutral-maximum);
    }
  }

  -webkit-appearance: none;
  width: 100%;
  cursor: pointer;

  &:focus:not([data-focus-visible-added]) {
    outline: none;
  }

   &::-webkit-slider-thumb {
    -webkit-appearance: none;
    margin-top: rem(-6px);
  }

  &::-ms-track {
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

}
</style>

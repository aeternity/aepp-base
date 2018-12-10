<template>
  <div
    :class="[fill, { disabled }]"
    class="ae-toolbar"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    fill: {
      type: String,
      validator: value => [
        '',
        'primary',
        'secondary',
        'neutral',
        'alternative',
      ].includes(value),
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.ae-toolbar {
  height: 2rem;
  line-height: 2rem;
  padding: 0 1rem;
  background: $color-neutral-positive-2;
  font-weight: 500;
  color: $color-neutral-negative-1;

  &.disabled {
    cursor: not-allowed;
    color: rgba($color-neutral-negative-1, 0.5);
  }

  &.primary, &.secondary, &.neutral, &.alternative {
    color: #fff;

    &.disabled {
      color: rgba(#fff, 0.5);
    }
  }

  &.primary {
    background: $color-primary-negative-2;
  }

  &.secondary {
    background: $color-secondary-negative-2;
  }

  &.neutral {
    background: $color-neutral-minimum;
  }

  &.alternative {
    background: $color-alternative-negative-2;
  }
}
</style>

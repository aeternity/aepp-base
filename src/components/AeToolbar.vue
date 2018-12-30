<template>
  <div
    :class="[fill]"
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
  color: $color-neutral-negative-1;

  &.primary, &.secondary, &.neutral, &.alternative {
    color: #fff;
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

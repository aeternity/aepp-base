<template>
  <div :class="[fill]" class="ae-toolbar">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    fill: {
      type: String,
      validator: (value) => ['', 'primary', 'secondary', 'dark', 'alternative'].includes(value),
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
@use '../styles/variables';

.ae-toolbar {
  height: 2rem;
  line-height: 2rem;
  padding: 0 1rem;
  background: variables.$color-neutral-positive-2;
  color: variables.$color-neutral-negative-1;

  &.primary,
  &.secondary,
  &.neutral,
  &.alternative {
    color: #fff;
  }

  &.primary {
    background: variables.$color-primary-negative-2;
  }

  &.secondary {
    background: variables.$color-secondary-negative-2;
  }

  &.dark {
    background: variables.$color-neutral-minimum;
  }

  &.alternative {
    background: variables.$color-alternative-negative-2;
  }

  ::v-deep a {
    color: inherit;
  }
}
</style>

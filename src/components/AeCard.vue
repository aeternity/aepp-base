<template>
  <div :class="['ae-card', fill]">
    <slot />
    <AeToolbar
      v-if="$slots['toolbar']"
      :fill="fill"
    >
      <slot name="toolbar" />
    </AeToolbar>
  </div>
</template>

<script>
import AeToolbar from './AeToolbar.vue';

export default {
  components: { AeToolbar },
  props: {
    fill: {
      type: String,
      validator: (value) => [
        '',
        'primary',
        'secondary',
        'dark',
        'alternative',
        'maximum',
      ].includes(value),
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
@use '../styles/variables';
@use '../styles/typography';

.ae-card {
  @extend %face-sans-base;
  border-radius: 8px;
  background: variables.$color-neutral-positive-3;
  color: variables.$color-neutral;
  box-shadow: 0 0 16px variables.$color-shadow-alpha-15;
  overflow: hidden;

  &.primary {
    background: variables.$color-primary;
    color: variables.$color-primary-negative-3;
  }

  &.secondary {
    background: variables.$color-secondary;
    color: variables.$color-secondary-negative-3;
  }

  &.dark {
    background: variables.$color-neutral-negative-3;
    color: #fff;
  }

  &.alternative {
    background: variables.$color-alternative;
    color: variables.$color-alternative-negative-3;
  }

  &.maximum {
    background: variables.$color-neutral-maximum;
  }
}
</style>

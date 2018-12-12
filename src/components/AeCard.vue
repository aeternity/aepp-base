<template>
  <div :class="['ae-card', fill]">
    <slot />
    <ae-toolbar
      v-if="$slots['toolbar']"
      :fill="fill"
    >
      <slot name="toolbar" />
    </ae-toolbar>
  </div>
</template>

<script>
import AeToolbar from './AeToolbar.vue';

export default {
  components: { AeToolbar },
  props: {
    fill: {
      type: String,
      validator: value => [
        '',
        'primary',
        'secondary',
        'neutral',
        'alternative',
        'maximum',
      ].includes(value),
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.ae-card {
  @extend %face-sans-base;
  border-radius: 8px;
  background: $color-neutral-positive-3;
  color: $color-neutral;
  box-shadow: 0 0 16px $color-shadow-alpha-15;
  overflow: hidden;

  &.primary {
    background: $color-primary;
    color: $color-primary-negative-3;
  }

  &.secondary {
    background: $color-secondary;
    color: $color-secondary-negative-3;
  }

  &.neutral {
    background: $color-neutral-negative-3;
    color: $color-white;
  }

  &.alternative {
    background: $color-alternative;
    color: $color-alternative-negative-3;
  }

  &.maximum {
    background: $color-neutral-maximum;
  }
}
</style>

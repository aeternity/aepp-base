<template>
  <input
    class="ae-input-plain"
    :class="fill"
    :value="value"
    v-bind="$attrs"
    @input="$emit('input', $event.target.value)"
  >
</template>

<script>
export default {
  props: {
    fill: { type: String, default: 'neutral' },
    value: { type: String, default: '' },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/animations.scss';

.ae-input-plain {
  transition: border-color $base-transition-time;
  width: rem(150px);
  padding: 0;
  border: none;
  border-bottom: rem(1px) solid transparent;
  background: none;
  @extend %face-sans-base;

  &.neutral {
    color: $color-neutral-negative-2;

    &::placeholder {
      color: $color-neutral;
    }

    &:focus {
      border-color: $color-neutral;
    }
  }

  &.light {
    color: $color-white;

    &::placeholder {
      color: $color-neutral-positive-1;
    }

    &:focus {
      border-color: $color-neutral-positive-1;
    }
  }
}
</style>

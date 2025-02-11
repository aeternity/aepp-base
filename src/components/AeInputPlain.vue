<template>
  <input
    class="ae-input-plain"
    :class="fill"
    :value="value"
    v-bind="$attrs"
    @input="$emit('input', $event.target.value)"
  />
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
@use '../styles/variables';
@use '../styles/typography';

.ae-input-plain {
  transition: border-color variables.$base-transition-time;
  width: functions.rem(150px);
  padding: 0;
  border: none;
  border-bottom: functions.rem(1px) solid transparent;
  background: none;
  @extend %face-sans-base;

  &.neutral {
    color: variables.$color-neutral-negative-2;

    &::placeholder {
      color: variables.$color-neutral;
    }

    &:focus {
      border-color: variables.$color-neutral;
    }
  }

  &.light {
    color: #fff;

    &::placeholder {
      color: variables.$color-neutral-positive-1;
    }

    &:focus {
      border-color: variables.$color-neutral-positive-1;
    }
  }
}
</style>

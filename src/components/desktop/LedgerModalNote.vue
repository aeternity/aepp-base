<template>
  <div
    class="ledger-modal-note"
    :class="[fill]"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    fill: {
      type: String,
      validator: (value) => [
        'neutral',
        'dark',
      ].includes(value),
      default: 'neutral',
    },
  },
};
</script>

<style scoped lang="scss">
@use '../../styles/variables';
@use '../../styles/functions';
@use '../../styles/typography';

.ledger-modal-note {
  margin-left: functions.rem(70px);
  margin-right: functions.rem(70px);
  @extend %face-sans-s;
  text-align: center;

  &.neutral {
    color: variables.$color-neutral-negative-1;
  }

  &.dark {
    color: variables.$color-neutral-negative-3;
  }
}
</style>

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
@import '../../styles/typography';

.ledger-modal-note {
  margin-left: rem(70px);
  margin-right: rem(70px);
  @extend %face-sans-s;
  text-align: center;

  &.neutral {
    color: $color-neutral-negative-1;
  }

  &.dark {
    color: $color-neutral-negative-3;
  }
}
</style>

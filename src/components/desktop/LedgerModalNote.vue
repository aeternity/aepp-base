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
      validator: value => [
        'neutral',
        'dark',
      ].includes(value),
      default: 'neutral',
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';

.ledger-modal-note {
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

<template>
  <component
    :is="renderAs"
    :to="to"
    class="settings-list-item"
    @click="$emit('click', $event)"
  >
    <div class="content">
      <slot />
      <div class="space" />
      <slot name="right" />
    </div>
  </component>
</template>

<script>
export default {
  props: {
    to: { type: [Object, String], default: undefined },
  },
  computed: {
    renderAs() {
      if (this.to) return 'router-link';
      return 'label';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.settings-list-item {
  display: block;
  padding: 0 rem(15px);

  &:hover {
    background-color: $color-neutral-positive-3;
  }

  .content {
    padding: rem(22px) rem(12px);
    border-bottom: 2px solid $color-neutral-positive-2;
    @extend %face-sans-s;
    font-weight: 500;
  }

  &:last-child .content {
    border-bottom: none;
  }
}
</style>

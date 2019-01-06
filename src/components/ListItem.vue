<template>
  <component
    :is="renderAs"
    :to="to"
    class="list-item"
    @click="$emit('click', $event)"
  >
    <div class="content">
      <slot name="icon" />
      <div :class="['title', $slots.icon ? 'after-icon' : '']">
        {{ title }}
        <small :class="{ monospace: subtitleMonospace }">
          {{ subtitle }}
        </small>
      </div>
      <slot />
      <div
        v-if="$slots.right"
        class="space"
      />
      <slot name="right" />
    </div>
  </component>
</template>

<script>
export default {
  props: {
    to: { type: [Object, String], default: undefined },
    title: { type: String, required: true },
    subtitle: { type: String, default: undefined },
    subtitleMonospace: { type: Boolean, default: false },
    inactive: { type: Boolean, default: false },
  },
  computed: {
    renderAs() {
      if (this.inactive) return 'div';
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

.list-item {
  display: block;
  padding: 0 rem(16px);
  text-decoration: none;
  color: $color-neutral-negative-3;

  &:hover {
    background-color: $color-neutral-positive-3;
  }

  .content {
    display: flex;
    align-items: center;
    height: rem(68px);
    border-bottom: 2px solid $color-neutral-positive-2;
    @extend %face-sans-s;
    font-weight: 500;

    .title {
      @extend %face-sans-s;
      font-weight: 500;
      color: $color-neutral-negative-3;

      &.after-icon {
        margin-left: rem(12px);
      }

      small {
        display: block;
        @extend %face-sans-xs;
        letter-spacing: normal;
        color: $color-neutral-negative-1;

        &.monospace {
          @extend %face-mono-xs;
          letter-spacing: normal;
        }
      }
    }

    /deep/ img {
      margin: 0 rem(9px) rem(4px) 0;
      width: rem(33px);
    }
  }

  &:last-child .content {
    border-bottom: none;
  }

  .space {
    flex-grow: 1;
  }
}
</style>

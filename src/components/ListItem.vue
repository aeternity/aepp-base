<template>
  <Component
    :is="renderAs"
    :to="to"
    class="list-item"
    @click="$emit('click', $event)"
  >
    <div
      :class="{ 'border-dark': borderDark, 'has-icon': $slots.icon }"
      class="content"
    >
      <slot name="icon" />

      <div
        v-if="title || subtitle"
        class="label"
        :class="{ 'has-content-after': $slots.default || $slots.right }"
      >
        <div
          class="title"
          :class="{ monospace: titleMonospace }"
        >
          {{ title }}
        </div>
        <div
          class="subtitle"
          :class="{ monospace: subtitleMonospace }"
        >
          {{ subtitle }}
        </div>
      </div>

      <slot />

      <div
        v-if="$slots.right"
        class="space"
      />
      <slot name="right" />
    </div>
  </Component>
</template>

<script>
export default {
  props: {
    to: { type: [Object, String], default: undefined },
    title: { type: String, default: undefined },
    titleMonospace: Boolean,
    subtitle: { type: String, default: undefined },
    subtitleMonospace: Boolean,
    inactive: Boolean,
    borderDark: Boolean,
  },
  computed: {
    renderAs() {
      if (this.inactive) return 'div';
      if (this.to) return 'RouterLink';
      return 'label';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/placeholders/typography.scss';
@import '../styles/variables/colors.scss';

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
    @extend %face-sans-s;
    font-weight: 500;

    &.has-icon {
      > :first-child {
        flex-shrink: 0;
      }

      .label {
        margin-left: rem(12px);
      }
    }

    .label {
      @extend %face-sans-s;
      white-space: nowrap;
      font-weight: 500;
      color: $color-neutral-negative-3;

      &.has-content-after {
        margin-right: rem(4px);
      }

      &, .title, .subtitle {
        overflow: hidden;
        text-overflow: ellipsis;

        &.monospace {
          font-family: $font-mono;
        }
      }

      .subtitle {
        @extend %face-sans-xs;
        letter-spacing: normal;
        color: $color-neutral-negative-1;
      }
    }

    .space {
      flex-grow: 1;
    }

    /deep/ img {
      width: rem(33px);
    }
  }

  & + .list-item {
    &, &:visited {
      .content {
        border-top: 2px solid $color-neutral-positive-2;

        &.border-dark {
          border-top-color: $color-neutral-positive-1;
        }
      }
    }
  }
}
</style>

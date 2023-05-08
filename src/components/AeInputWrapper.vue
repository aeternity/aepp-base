<template>
  <div
    :class="{ focus, error }"
    class="ae-input-wrapper"
  >
    <label :for="_uid">
      <span>
        {{ header }}
        <slot name="header" />
      </span>
      <span>
        {{ headerRight }}
        <slot name="header-right" />
      </span>
    </label>
    <main>
      <slot
        :id="_uid"
        :set-focus="f => focus = f"
      />
    </main>
    <AeToolbar
      v-if="
        defaultBottom || $slots['default-bottom']
          || defaultBottomRight || $slots['default-bottom-right']
      "
      class="default-bottom"
    >
      <div>
        {{ defaultBottom }}
        <slot name="default-bottom" />
      </div>
      <div>
        {{ defaultBottomRight }}
        <slot name="default-bottom-right" />
      </div>
    </AeToolbar>
    <AeToolbar
      v-if="footer || $slots.footer || footerRight || $slots['footer-right']"
      class="footer"
    >
      <div>
        {{ footer }}
        <slot name="footer" />
      </div>
      <div>
        {{ footerRight }}
        <slot name="footer-right" />
      </div>
    </AeToolbar>
  </div>
</template>

<script>
import AeToolbar from './AeToolbar.vue';

export default {
  components: { AeToolbar },
  props: {
    error: Boolean,
    header: {
      type: String,
      default: '',
    },
    headerRight: {
      type: String,
      default: '',
    },
    defaultBottom: {
      type: String,
      default: '',
    },
    defaultBottomRight: {
      type: String,
      default: '',
    },
    footer: {
      type: String,
      default: '',
    },
    footerRight: {
      type: String,
      default: '',
    },
  },
  data: () => ({ focus: false }),
};
</script>

<style lang="scss" scoped>
@import '../styles/typography';

.ae-input-wrapper {
  overflow: hidden;
  border-radius: rem(4px);
  background: $color-neutral-positive-3;
  margin-bottom: rem(16px);

  &.error,
  &.focus {
    transition-property: border, border-radius;
    transition-duration: $base-transition-time;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 2px solid;

    label,
    main {
      transition: margin-left $base-transition-time;
      margin-left: rem(14px);
    }

    .ae-toolbar {
      transition: padding-left $base-transition-time;
      padding-left: rem(14px);
    }
  }

  &.error:not(.focus) {
    background-color: $color-primary-positive-3;

    .ae-toolbar.footer {
      background-color: $color-primary-positive-1;
      color: #fff;
    }
  }

  $states: (
    error: $color-error,
    focus: $color-focus,
  );

  @each $state-name, $state-color in $states {
    &.#{$state-name} {
      border-color: $state-color;
      caret-color: $state-color;

      label span:first-child {
        color: $state-color;
      }
    }
  }

  label,
  main {
    margin: 0 rem(16px);
  }

  label {
    color: $color-neutral-negative-1;

    span:last-child {
      color: $color-neutral-negative-3;
    }
  }

  label,
  .ae-toolbar {
    display: flex;
    justify-content: space-between;
    @extend %face-sans-xs;
    line-height: rem(32px);

    &.default-bottom {
      justify-content: flex-end;
      background-color: transparent;
    }
  }
}
</style>

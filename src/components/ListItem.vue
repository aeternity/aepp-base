<template>
  <Component :is="renderAs" :to="to" class="list-item" @click="$emit('click', $event)">
    <div :class="{ 'border-dark': borderDark, 'has-icon': $slots.icon }" class="content">
      <slot name="icon" />

      <div
        v-if="title || subtitle"
        class="label"
        :class="{ 'has-content-after': $slots.default || $slots.right }"
      >
        <div class="title" :class="{ monospace: titleMonospace }">
          {{ title }}
        </div>
        <div class="subtitle" :class="{ monospace: subtitleMonospace }">
          {{ subtitle }}
        </div>
      </div>

      <slot />

      <div v-if="$slots.right" class="space" />
      <slot name="right" />
    </div>
  </Component>
</template>

<script>
import AeLink from './AeLink.vue';

export default {
  components: { AeLink },
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
      if (this.to) return 'AeLink';
      return 'label';
    },
  },
};
</script>

<style lang="scss" scoped>
@use '../styles/variables';
@use '../styles/functions';
@use '../styles/typography';

a,
label {
  .list-item:hover {
    background-color: variables.$color-neutral-positive-3;
  }
}

.list-item {
  display: block;
  padding: 0 functions.rem(16px);
  text-decoration: none;
  color: variables.$color-neutral-negative-3;

  .content {
    display: flex;
    align-items: center;
    height: functions.rem(68px);
    @extend %face-sans-s;
    font-weight: 500;

    &.has-icon .label {
      margin-left: functions.rem(12px);
    }

    .label {
      flex-shrink: 1;
      @extend %face-sans-s;
      white-space: nowrap;
      font-weight: 500;
      color: variables.$color-neutral-negative-3;

      &.has-content-after {
        margin-right: functions.rem(4px);
      }

      &,
      .title,
      .subtitle {
        overflow: hidden;
        text-overflow: ellipsis;

        &.monospace {
          font-family: variables.$font-mono;
        }
      }

      .subtitle {
        @extend %face-sans-xs;
        letter-spacing: normal;
        color: variables.$color-neutral-negative-1;
      }
    }

    .space {
      flex-grow: 1;
    }

    ::v-deep {
      img {
        width: functions.rem(33px);
      }

      > * {
        flex-shrink: 0;
      }
    }
  }

  & + .list-item {
    &,
    &:visited {
      .content {
        border-top: 2px solid variables.$color-neutral-positive-2;

        &.border-dark {
          border-top-color: variables.$color-neutral-positive-1;
        }
      }
    }
  }
}
</style>

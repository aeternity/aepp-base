<template>
  <div :class="['guide', fill]">
    <span class="icon">{{ icon }}</span>
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fill: {
      type: String,
      validator: value => [
        'primary',
        'neutral',
      ].includes(value),
      default: 'primary',
    },
    icon: {
      type: String,
      default: undefined,
    },
  },
};
</script>

<style lang="scss">
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors';

.guide {
  display: flex;
  margin-bottom: rem(27px);
  @extend %face-sans-l;
  font-weight: 500;
  letter-spacing: -0.5px;
  color: $color-neutral-negative-3;

  .icon {
    margin-right: 11px;
  }

  em {
    font-style: normal;
  }

  &.primary {
    em {
      color: $color-primary;
    }

    .icon {
      color: $color-primary;
    }
  }

  &.neutral {
    color: $color-primary-positive-3;

    em {
     color: $color-neutral-maximum;
    }
  }
}
</style>

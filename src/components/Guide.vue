<template>
  <div :class="['guide', fill, { desktop: !$globals.IS_MOBILE_DEVICE }]">
    <span
      v-if="icon"
      class="icon"
    >
      {{ icon }}
    </span>
    <div><slot /></div>
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
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.guide {
  display: flex;
  margin-bottom: rem(27px);
  @extend %face-sans-l;
  font-weight: 500;
  letter-spacing: -0.5px;
  color: $color-neutral-negative-3;

  &.desktop {
    font-size: rem(30px);
    line-height: rem(39px);
    margin-bottom: rem(15px);
  }

  .icon {
    margin: rem(3px) rem(16px) 0 rem(-32px);
    @extend %face-sans-base;
    font-weight: bold;
  }

  img {
    margin: 0 rem(5px);
    width: rem(23px);
  }

  .ae-identicon {
    vertical-align: middle;
  }

  .ae-address.short {
    font-size: inherit;
  }

  em {
    font-style: normal;
    color: $color-primary;
  }

  mark, strong {
    font-weight: 500;
    background: none;
  }

  &.primary {
    .icon {
      color: $color-primary;
    }
  }

  &.neutral {
    color: $color-primary-positive-3;

    .icon {
      color: $color-neutral-maximum;
    }

    em {
      color: $color-neutral-maximum;
    }
  }

  mark {
    color: $color-secondary;
  }

  strong {
    color: $color-alternative;
  }
}
</style>

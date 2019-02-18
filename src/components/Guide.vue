<template>
  <div :class="['guide', fill, { desktop: !$globals.IS_MOBILE_DEVICE }]">
    <span
      v-if="icon"
      class="icon"
    >
      {{ icon }}
    </span>
    <div class="content">
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
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.guide {
  display: flex;
  margin-bottom: rem(27px);

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

  .content {
    @extend %face-sans-l;
    font-weight: 500;
    letter-spacing: -0.5px;

    img {
      width: rem(23px);
    }

    img, .ae-identicon {
      vertical-align: middle;
    }

    .ae-address.short {
      font-size: inherit;
    }

    em {
      font-style: normal;
    }

    mark, strong {
      font-weight: 500;
    }

    mark {
      color: $color-secondary;
      background: none;
    }

    strong {
      color: $color-alternative;
    }
  }

  &.primary {
    .icon {
      color: $color-primary;
    }

    .content {
      color: $color-neutral-negative-3;

      em {
        color: $color-primary;
      }
    }
  }

  &.neutral {
    .icon {
      color: $color-neutral-maximum;
    }

    .content {
      color: $color-primary-positive-3;

      em {
        color: $color-neutral-maximum;
      }
    }
  }
}
</style>

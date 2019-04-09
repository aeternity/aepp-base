<template>
  <div
    class="guide"
    :class="[fill, size, { 'has-icon': $slots.icon }]"
  >
    <span
      v-if="$slots.icon"
      class="icon"
    >
      <slot name="icon" />
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
        'alternative',
        'neutral',
      ].includes(value),
      default: 'primary',
    },
    size: {
      type: String,
      validator: value => ['small', 'medium', 'big'].includes(value),
      default: 'medium',
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

  &.small {
    @extend %face-sans-base;
    margin-bottom: rem(20px);
  }

  &.medium {
    @extend %face-sans-l;
  }

  &.big {
    font-family: $font-sans;
    font-size: rem(30px);
    line-height: rem(39px);
    margin-bottom: rem(15px);
  }

  .icon {
    flex-shrink: 0;
    width: rem(30px);
    padding-left: rem(6px);
  }

  .content {
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
      color: rgba(255, 255, 255, 0.66846);

      em {
        color: $color-neutral-maximum;
      }
    }
  }

  &.alternative {
    .icon {
      color: $color-alternative;
    }

    .content {
      color: $color-neutral-negative-3;

      em {
        color: $color-alternative-negative-1;
      }
    }
  }

  p {
    margin-top: 0;
    margin-bottom: 0;

    & + p {
      margin-top: rem(28px);
    }
  }
}
</style>

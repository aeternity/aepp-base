<template>
  <div :class="['guide', fill]">
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
    margin: rem(3px) rem(16px) 0 rem(-32px);
    @extend %face-sans-base;
    font-weight: bold;
  }

  img {
    margin: 0 rem(5px);
    width: rem(23px);
  };

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

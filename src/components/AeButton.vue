<template>
  <ButtonPlain
    :class="[fill, size, { plain }]"
    v-bind="$attrs"
    class="ae-button"
    v-on="$listeners"
  >
    <slot />
  </ButtonPlain>
</template>

<script>
import ButtonPlain from './ButtonPlain.vue';

export default {
  components: { ButtonPlain },
  props: {
    fill: {
      type: String,
      validator: value => [
        'primary',
        'secondary',
        'alternative',
        'dark',
        'light',
      ].includes(value),
      default() {
        if ([true, ''].includes(this.$options.propsData.plain)) return 'dark';
        return 'primary';
      },
    },
    size: {
      type: String,
      validator: value => ['small', 'medium'].includes(value),
      default: 'medium',
    },
    plain: Boolean,
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/placeholders/typography.scss';
@import '../styles/variables/colors.scss';

.ae-button {
  margin: rem(3px);
  @extend %face-sans-xs;
  letter-spacing: rem(1.3px);
  font-weight: bold;
  text-transform: uppercase;

  &.primary {
    background-color: $color-primary;
    color: #fff;
  }

  &.secondary {
    background-color: $color-secondary;
    color: #fff;
  }

  &.alternative {
    background-color: $color-alternative;
    color: #fff;
  }

  &.dark {
    background-color: $color-neutral-minimum;
    color: #fff;
  }

  &.light {
    background-color: $color-neutral-maximum;
    color: #000;
  }

  &.medium {
    min-width: rem(311px);
    height: rem(56px);
    border-radius: rem(32px);
    line-height: rem(56px);
    text-align: center;
  }

  &[disabled] {
    &.primary {
      background-color: $color-primary-positive-3;
    }

    &.secondary {
      background-color: $color-neutral-positive-1;
    }

    &.alternative {
      background-color: $color-alternative-positive-3;
    }
  }

  &.plain {
    background-color: transparent;

    &.primary {
      color: $color-primary;
    }

    &.secondary {
      color: $color-secondary;
    }

    &.alternative {
      color: $color-alternative;
    }

    &.dark {
      color: $color-neutral-minimum;
    }

    &.light {
      color: $color-neutral-maximum;
    }
  }
}
</style>

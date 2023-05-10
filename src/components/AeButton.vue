<template>
  <ButtonPlain
    :class="[fill, size, { plain }]"
    v-bind="$attrs"
    class="ae-button"
    v-on="$listeners"
  >
    <AeSpinner v-if="spinner" />
    <slot v-else />
  </ButtonPlain>
</template>

<script>
import ButtonPlain from './ButtonPlain.vue';
import AeSpinner from './AeSpinner.vue';

export default {
  components: { ButtonPlain, AeSpinner },
  props: {
    fill: {
      type: String,
      validator: (value) => [
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
      validator: (value) => ['small', 'medium'].includes(value),
      default: 'medium',
    },
    plain: Boolean,
    spinner: Boolean,
  },
};
</script>

<style lang="scss" scoped>
@use '../styles/variables';
@use '../styles/functions';
@use '../styles/typography';

.ae-button {
  margin: functions.rem(3px);
  @extend %face-sans-xs;
  letter-spacing: functions.rem(1.3px);
  font-weight: bold;
  text-transform: uppercase;

  &.primary {
    background-color: variables.$color-primary;
    color: #fff;
  }

  &.secondary {
    background-color: variables.$color-secondary;
    color: #fff;
  }

  &.alternative {
    background-color: variables.$color-alternative;
    color: #fff;
  }

  &.dark {
    background-color: variables.$color-neutral-minimum;
    color: #fff;
  }

  &.light {
    background-color: variables.$color-neutral-maximum;
    color: #000;
  }

  &.medium {
    min-width: functions.rem(311px);
    height: functions.rem(56px);
    border-radius: functions.rem(32px);
    line-height: functions.rem(56px);
    text-align: center;
  }

  &[disabled] {
    &.primary {
      background-color: variables.$color-primary-positive-3;
    }

    &.secondary {
      background-color: variables.$color-neutral-positive-1;
    }

    &.alternative {
      background-color: variables.$color-alternative-positive-3;
    }
  }

  &.plain {
    background-color: transparent;

    &.primary {
      color: variables.$color-primary;
    }

    &.secondary {
      color: variables.$color-secondary;
    }

    &.alternative {
      color: variables.$color-alternative;
    }

    &.dark {
      color: variables.$color-neutral-minimum;
    }

    &.light {
      color: variables.$color-neutral-maximum;
    }
  }

  .ae-spinner {
    width: functions.rem(24px);
    vertical-align: middle;
  }
}
</style>

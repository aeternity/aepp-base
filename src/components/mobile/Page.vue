<template>
  <div
    :class="fill"
    class="mobile-page"
  >
    <HeaderMobile
      :fill="headerFill || fill"
      :shadow="!!headerFill && headerFill !== fill && !$slots.header"
      v-bind="$attrs"
      padded
      v-on="$listeners"
    />

    <header
      v-if="$slots.header"
      :class="headerFill"
    >
      <div class="wrapper">
        <slot name="header" />
      </div>
    </header>

    <main>
      <div class="wrapper">
        <slot />
      </div>
    </main>

    <footer v-if="$slots.footer">
      <div class="wrapper">
        <slot name="footer" />
      </div>
    </footer>
  </div>
</template>

<script>
import HeaderMobile from './Header.vue';

export default {
  components: { HeaderMobile },
  props: {
    headerFill: {
      type: String,
      validator: value => [
        'primary',
        'alternative',
        'neutral',
        'light',
        '',
      ].includes(value),
      default: '',
    },
    fill: {
      type: String,
      validator: value => [
        'primary',
        'alternative',
        'neutral',
        'light',
      ].includes(value),
      default: 'light',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/fallback/mixins.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';

.mobile-page {
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  &,
  header {
    &.primary {
      background-color: $color-primary;
    }

    &.alternative {
      background-color: $color-alternative;
    }

    &.neutral {
      background-color: $color-neutral-positive-2;
    }

    &.light {
      background-color: $color-neutral-maximum;
    }
  }

  .wrapper {
    max-width: $screen-phone;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 0 rem(48px);

    /deep/ {
      .guide.has-icon {
        margin-left: rem(-36px);
      }

      > .ae-button.medium {
        display: block;
        width: stretch;
        min-width: 0;
      }

      > .ae-button.medium,
      > .ae-button-group {
        margin-left: rem(-16px);
        margin-right: rem(-16px);

        &:last-child {
          margin-bottom: rem(32px);
        }
      }

      .ae-input-wrapper {
        margin-left: rem(-16px);
        margin-right: rem(-16px);
      }

      > .ae-card {
        margin-left: rem(-16px);
        margin-right: rem(-16px);

        .ae-input-wrapper {
          margin-left: 0;
          margin-right: 0;
        }
      }

      > .list-item {
        margin-left: rem(-16px);
        margin-right: rem(-16px);
      }
    }
  }

  header {
    .wrapper /deep/ {
      .ae-input-wrapper:last-child,
      > .ae-card:last-child {
        margin-bottom: rem(-32px);
      }
    }

    & + * {
      margin-top: rem(32px);
    }
  }

  header + main {
    padding-top: rem(16px);
  }

  main {
    flex-grow: 1;
    padding-bottom: rem(32px);

    /deep/ {
      .ae-card:first-child {
        margin-top: rem(32px);
      }
    }
  }

  footer /deep/ .ae-button:not(.medium) {
    margin-bottom: rem(23px);
    margin-top: rem(23px);
  }
}
</style>

<template>
  <Component
    :is="modal ? 'AeModal' : 'div'"
    :class="[fill, { desktop: !$globals.IS_MOBILE_DEVICE }, { modal }]"
    class="page"
  >
    <PageHeader
      :fill="headerFill || fill"
      :shadow="!!headerFill && headerFill !== fill && !$slots.header"
      v-bind="$attrs"
      padded
      v-on="$listeners"
    >
      <slot name="title" />
    </PageHeader>

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

    <footer v-if="$slots.footer || !hideTabBar">
      <div class="wrapper">
        <slot name="footer" />
      </div>
      <TabBar v-if="$globals.IS_MOBILE_DEVICE && !hideTabBar" />
    </footer>
  </Component>
</template>

<script>
import PageHeader from './PageHeader.vue';
import TabBar from './mobile/TabBar.vue';
import AeModal from './AeModal.vue';

export default {
  components: { PageHeader, TabBar, AeModal },
  props: {
    headerFill: {
      type: String,
      validator: value => [
        'primary',
        'alternative',
        'neutral',
        'dark',
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
        'dark',
        'light',
      ].includes(value),
      default: 'light',
    },
    hideTabBar: Boolean,
    modal: Boolean,
  },
  async mounted() {
    if (process.env.IS_CORDOVA && process.env.IS_IOS) {
      await new Promise(resolve => document.addEventListener('deviceready', resolve));
      this.$watch(({ headerFill, fill }) => headerFill || fill, (fill) => {
        const style = ['primary', 'alternative', 'dark']
          .includes(fill) ? 'LightContent' : 'Default';
        window.StatusBar[`style${style}`]();
      }, { immediate: true });
      this.$once('hook:destroyed', () => window.StatusBar.styleDefault());
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/mixins';
@import '../styles/typography';

.page {
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  &:not(.ae-modal),
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

    &.dark {
      background-color: $color-neutral-minimum;
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

    ::v-deep {
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

      > {
        h2, p {
          @extend %face-sans-s;
        }

        h2 {
          margin-top: rem(30px);
          font-weight: 500;
          color: $color-neutral-negative-3;
        }

        p {
          margin-top: rem(15px);
          color: $color-neutral;
        }

        .ae-spinner {
          display: block;
          margin: rem(60px) auto;
        }
      }
    }
  }

  header {
    .wrapper ::v-deep {
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

    ::v-deep {
      .ae-card:first-child {
        margin-top: rem(32px);
      }
    }
  }

  footer {
    position: sticky;
    bottom: 0;

    @media (max-height: 500px) {
      position: static;
    }

    .wrapper ::v-deep > {
      .ae-button:not(.plain),
      .ae-button-group {
        box-shadow: 0 0 16px $color-shadow-alpha-15;
      }

      .ae-button:not(.medium) {
        margin-bottom: rem(23px);
        margin-top: rem(23px);
      }
    }
  }

  &.desktop {
    &:not(.ae-modal),
    .page-header,
    header {
      background-color: $color-neutral-positive-2;
    }

    &.ae-modal {
      ::v-deep .modal-plain {
        background-color: $color-primary;

        .page-header {
          background-color: $color-primary;
          margin-top: rem(32px);

          header {
            display: none;
          }
        }
      }
    }

    .page-header {
      &.empty {
        height: 0px;
      }

      &.shadow {
        box-shadow: none;
      }

      ::v-deep .button-plain {
        color: $color-neutral-negative-3;
      }
    }

    header ::v-deep .guide.neutral .content {
      em {
        color: $color-primary;
      }

      &,
      .account-inline {
        color: $color-neutral-negative-3;
      }
    }

    .wrapper .ae-button {
      margin-top: rem(16px);
      margin-left: rem(54px);
      margin-right: rem(54px);
    }
  }
}
</style>

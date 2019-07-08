<template>
  <div
    class="header-mobile"
    :class="[fill, { shadow: shadow || (!empty && scrolled), empty }]"
  >
    <header :class="{ padded }">
      <ButtonPlain
        v-if="leftButtonIconName"
        class="left"
        :to="leftButtonTo"
        @click="$emit('left-button-click', $event)"
      >
        <Component :is="leftButtonIconName" />
      </ButtonPlain>

      <span class="title">
        {{ title }}<slot />
      </span>

      <ButtonPlain
        v-if="rightButtonIconName"
        class="right"
        :to="rightButtonTo"
        @click="$emit('right-button-click', $event)"
      >
        <Component :is="rightButtonIconName" />
      </ButtonPlain>
    </header>
  </div>
</template>

<script>
import ButtonPlain from '../ButtonPlain.vue';
import { Back, Close, Help } from '../icons';

export default {
  components: {
    ButtonPlain,
    Back,
    Close,
    Help,
  },
  props: {
    leftButtonIconName: { type: String, default: null },
    leftButtonTo: { type: [String, Object], default: null },
    title: { type: String, default: '' },
    rightButtonIconName: { type: String, default: null },
    rightButtonTo: { type: [String, Object], default: null },
    fill: {
      type: String,
      validator: value => [
        'primary',
        'secondary',
        'alternative',
        'dark',
        'neutral',
        'light',
      ].includes(value),
      default: 'light',
    },
    shadow: Boolean,
    padded: Boolean,
  },
  data: () => ({ scrolled: false }),
  computed: {
    empty() {
      return !(this.title
        || this.$slots.default
        || this.leftButtonIconName
        || this.rightButtonIconName);
    },
  },
  mounted() {
    const scrollHandler = () => { this.scrolled = window.scrollY > 0; };
    scrollHandler();
    window.addEventListener('scroll', scrollHandler);
    this.$once('hook:destroyed', () => window.removeEventListener('scroll', scrollHandler));
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/placeholders/typography.scss';
@import '../../styles/variables/colors.scss';
@import '../../styles/fallback/variables.scss';

.header-mobile {
  position: sticky;
  top: 0;
  padding-top: env(safe-area-inset-top);
  transition: box-shadow .5s;

  &.empty {
    position: static;

    header {
      height: rem(24px);
    }
  }

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

  &.neutral {
    background-color: $color-neutral-positive-2;
    color: $color-neutral-negative-3;
  }

  &.light {
    background-color: $color-neutral-maximum;
    color: $color-neutral-negative-3;
  }

  &.shadow {
    box-shadow: 0 0 rem(8px) rgba(#1B4479, 0.1);
  }

  header {
    display: flex;
    height: rem(54px);
    margin: 0 auto;
    line-height: rem(54px);
    @extend %face-sans-base;
    font-weight: 500;

    &.padded {
      max-width: $screen-phone;
    }

    .button-plain {
      color: inherit;
    }

    $button-width: rem(48px);

    .left, .right {
      width: $button-width;
      text-align: center;
    }

    .title {
      flex-grow: 1;

      &:first-child {
        margin-left: $button-width;
      }
    }
  }
}
</style>

<template>
  <Transition
    appear
    name="fade"
  >
    <div class="notification">
      <div class="content">
        <slot>{{ text }}</slot>
      </div>

      <footer v-if="$slots.footer">
        <slot name="footer" />
      </footer>
    </div>
  </Transition>
</template>

<script>
export default {
  props: {
    resolve: { type: Function, required: true },
    text: { type: String, default: '' },
  },
  mounted() {
    setTimeout(() => this.resolve(), 5000);
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/placeholders/typography.scss';
@import '../styles/variables/colors.scss';

.notification {
  position: fixed;
  top: 0;
  left: rem(10px);
  right: rem(10px);
  max-width: rem(520px);
  margin-left: auto;
  margin-right: auto;
  margin-top: rem(10px);
  margin-top: calc(#{rem(10px)} + env(safe-area-inset-top));
  border-radius: rem(8px);
  background-color: $color-neutral-maximum;
  box-shadow: 0 0 rem(100px) rem(30px) rgba(146, 156, 166, 0.4);
  @extend %face-sans-base;

  &.fade-enter-active, &.fade-leave-active {
    transition: opacity 0.25s ease-out;
  }

  &.fade-enter, &.fade-leave-to {
    opacity: 0;
  }

  .content {
    overflow-wrap: break-word;
    padding: rem(20px) rem(16px);

    /deep/ .list-item {
      padding-left: 0;
      padding-right: 0;

      .content {
        height: rem(40px);
      }
    }
  }

  footer {
    display: flex;
    padding: rem(8px) 0;
    background-color: $color-neutral-positive-2;
    border-radius: 0 0 rem(8px) rem(8px);

    /deep/ .ae-button {
      flex-grow: 1;
      flex-basis: 0;
      height: rem(20px);
      line-height: rem(20px);
      font-size: rem(11px);
      font-weight: 500;
      letter-spacing: rem(1.1px);
      color: $color-neutral-negative-3;

      & + .ae-button {
        border-left: rem(1px) solid $color-neutral-positive-1;
      }
    }
  }
}
</style>

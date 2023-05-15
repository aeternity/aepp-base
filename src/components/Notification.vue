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
@use '../styles/variables';
@use '../styles/functions';
@use '../styles/typography';

.notification {
  position: fixed;
  top: 0;
  left: functions.rem(10px);
  right: functions.rem(10px);
  max-width: functions.rem(520px);
  margin-left: auto;
  margin-right: auto;
  margin-top: functions.rem(10px);
  margin-top: calc(#{functions.rem(10px)} + env(safe-area-inset-top));
  border-radius: functions.rem(8px);
  background-color: variables.$color-neutral-maximum;
  box-shadow: 0 0 functions.rem(100px) functions.rem(30px) rgba(146, 156, 166, 0.4);
  @extend %face-sans-base;

  &.fade-enter-active, &.fade-leave-active {
    transition: opacity 0.25s ease-out;
  }

  &.fade-enter, &.fade-leave-to {
    opacity: 0;
  }

  .content {
    overflow-wrap: break-word;
    padding: functions.rem(20px) functions.rem(16px);

    ::v-deep .list-item {
      padding-left: 0;
      padding-right: 0;

      .content {
        height: functions.rem(40px);
      }
    }
  }

  footer {
    display: flex;
    padding: functions.rem(8px) 0;
    background-color: variables.$color-neutral-positive-2;
    border-radius: 0 0 functions.rem(8px) functions.rem(8px);

    ::v-deep .ae-button {
      flex-grow: 1;
      flex-basis: 0;
      height: functions.rem(20px);
      line-height: functions.rem(20px);
      font-size: functions.rem(11px);
      font-weight: 500;
      letter-spacing: functions.rem(1.1px);
      color: variables.$color-neutral-negative-3;

      & + .ae-button {
        border-left: functions.rem(1px) solid variables.$color-neutral-positive-1;
      }
    }
  }
}
</style>

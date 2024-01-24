<template>
  <ButtonPlain
    class="ae-menu-item"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </ButtonPlain>
</template>

<script>
import ButtonPlain from './ButtonPlain.vue';

export default {
  components: { ButtonPlain },
};
</script>

<style lang="scss" scoped>
@use '../styles/variables';
@use '../styles/functions';
@use '../styles/typography';

.ae-menu-item {
  height: functions.rem(36px);
  padding: 0 functions.rem(16px);
  @extend %face-sans-s;
  line-height: functions.rem(36px);
  font-weight: 500;
  text-align: left;
  color: variables.$color-neutral-negative-3;

  &:hover {
    background-color: variables.$color-neutral-positive-3;
  }

  ::v-deep .icon {
    height: functions.rem(15px);

    &:first-child {
      margin-right: functions.rem(9px);
    }
  }
}
</style>

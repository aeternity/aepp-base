<template>
  <ButtonPlain
    class="button-flat"
    :class="{ 'exact-active': highlightedWhenExactActive }"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </ButtonPlain>
</template>

<script>
import ButtonPlain from '../ButtonPlain.vue';

export default {
  components: { ButtonPlain },
  props: { highlightedWhenExactActive: Boolean },
};
</script>

<style lang="scss" scoped>
@use '../../styles/variables';
@use '../../styles/functions';
@use '../../styles/typography';

.button-flat {
  $border-width: functions.rem(2px);
  $border-radius: functions.rem(4px);
  height: functions.rem(20px);
  padding: functions.rem(5px) 0;
  text-align: center;
  border: $border-width solid variables.$color-primary;
  border-left-width: 0;
  @extend %face-sans-s;
  font-weight: 500;
  color: variables.$color-primary;

  &:first-child {
    border-left-width: $border-width;
    border-radius: $border-radius 0 0 $border-radius;
  }

  &:last-child {
    border-radius: 0 $border-radius $border-radius 0;
  }

  &.router-link-exact-active.exact-active,
  &.router-link-active:not(.exact-active) {
    background-color: variables.$color-primary;
    color: #fff;
  }
}
</style>

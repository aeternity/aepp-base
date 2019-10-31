<template>
  <ButtonPlain
    class="button-flat"
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
};
</script>

<style lang="scss" scoped>
@import '../../styles/typography';

.button-flat {
  $border-width: rem(2px);
  $border-radius: rem(4px);
  height: rem(20px);
  width: rem(45px);
  padding: rem(5px) 0;
  text-align: center;
  border: $border-width solid $color-primary;
  border-left-width: 0;
  @extend %face-sans-s;
  font-weight: 500;
  color: $color-primary;

  &:first-child {
    border-left-width: $border-width;
    border-radius: $border-radius 0 0 $border-radius;
  }

  &:last-child {
    border-radius: 0 $border-radius $border-radius 0;
  }

  &.router-link-active {
    background-color: $color-primary;
    color: #fff;
  }
}
</style>

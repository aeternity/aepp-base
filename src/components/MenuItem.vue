<template>
  <ButtonPlain
    class="menu-item"
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
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.menu-item {
  height: rem(36px);
  padding: 0 rem(16px);
  @extend %face-sans-s;
  line-height: rem(36px);
  font-weight: 500;
  text-align: left;
  color: $color-neutral-negative-3;

  &:hover {
    background-color: $color-neutral-positive-3;
  }

  /deep/ .icon {
    height: rem(15px);

    &:first-child {
      margin-right: rem(9px);
    }
  }
}
</style>

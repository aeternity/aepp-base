<template>
  <div class="list-item-circle">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.list-item-circle {
  border-radius: 50%;
  height: rem(32px);
  line-height: rem(32px);
  width: rem(32px);
  background-color: $color-primary;
  box-shadow: 0 0 rem(16px) $color-shadow-alpha-15;
  text-align: center;
  color: #fff;

  .icon {
    height: rem(15px);
  }
}
</style>

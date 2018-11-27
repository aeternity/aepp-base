<template>
  <header class="header-mobile">
    <div class="left">
      <slot name="left" />
    </div>
    <span class="title">
      <slot />
    </span>
    <div class="right">
      <slot name="right" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.header-mobile {
  padding: rem(5px) rem(10px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  @extend %face-sans-base;

  .left {
    width: rem(38px);
    font-weight: 500;
  }

  .title {
    flex-grow: 2;
    font-weight: 500;
  }
}
</style>

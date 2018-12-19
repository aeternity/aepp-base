<template>
  <div class="switch-to-mobile-prompt">
    <div>
      This version of the wallet is only supported on mobile devices. Please use your mobile device
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/variables/colors';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';

.switch-to-mobile-prompt {
  display: flex;
  height: 100%;
  background: $color-primary;

  div {
    display: inline;
    text-align: center;
    margin: auto;
    max-width: 500px;
    font-size: 30px;
    @extend %face-sans-l;
    color: $color-neutral-maximum;
  }
}
</style>

<style lang="scss">
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

body {
  margin: 0;
}
</style>

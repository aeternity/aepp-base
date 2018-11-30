<template>
  <div class="switch-to-mobile-prompt">
    <p>
      This version of the wallet is only supported on mobile devices. Please use your mobile device
    </p>
  </div>
</template>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/variables/colors';

.switch-to-mobile-prompt {
  flex-grow: 1;
  display: flex;
  background-color: $color-primary;

  p {
    text-align: center;
    margin: auto;
    max-width: 500px;
    font-size: 30px;
    line-height: 1.56;
    color: $color-neutral-maximum;
  }
}
</style>

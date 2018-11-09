<template>
  <div class="switch-to-mobile-prompt">
    <p>
      This version of the wallet is only supported on mobile devices. Please use your mobile device
    </p>
  </div>
</template>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components/dist/variables.scss';

.switch-to-mobile-prompt {
  flex-grow: 1;
  display: flex;

  p {
    text-align: center;
    margin: auto;
    max-width: 300px;
    font-size: 18px;
    line-height: 1.56;
  }
}
</style>

<template>
  <div class="add-to-home-screen-prompt">
    <p>
      Please add this app to home screen.
    </p>
  </div>
</template>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/variables/colors';

.add-to-home-screen-prompt {
  flex-grow: 1;
  display: flex;
  background-color: $color-primary;

  p {
    text-align: center;
    margin: auto;
    max-width: 300px;
    font-size: 24px;
    line-height: 1.56;
    color: $color-neutral-maximum;
  }
}
</style>

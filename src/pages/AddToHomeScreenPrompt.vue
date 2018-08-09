<template>
  <div class="add-to-home-screen-prompt">
    <p>
      Please add this app to home screen.
    </p>
  </div>
</template>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components/dist/variables.scss';

.add-to-home-screen-prompt {
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

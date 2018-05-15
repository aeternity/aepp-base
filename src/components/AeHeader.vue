<template>
  <header class="ae-header">
    <img src="@/assets/img/header-logo.svg" />
    <slot />
  </header>
</template>

<style lang="scss" scoped>
  @import "~@aeternity/aepp-components/dist/mixins.scss";

  .ae-header {
    margin: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include desktop {
      margin: 50px;
    }
  }
</style>

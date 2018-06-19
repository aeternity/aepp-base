<template>
  <header class="header-desktop">
    <img src="@/assets/img/header-logo.svg" >
    <slot />
  </header>
</template>

<style lang="scss" scoped>
@import "~@aeternity/aepp-components/dist/mixins.scss";

.header-desktop {
  margin: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @include desktop {
    margin: 50px;
  }
}
</style>

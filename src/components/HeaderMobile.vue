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
.header-mobile {
  padding: 20px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 32px;

  .title {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    font-weight: bold;
    font-size: 24px;
    white-space: nowrap;
  }
}
</style>

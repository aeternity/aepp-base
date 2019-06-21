<template>
  <span class="icon-group">
    <slot />
  </span>
</template>

<style lang="scss" scoped>
@import '../styles/globals/functions.scss';

.icon-group {
  position: relative;

  > :nth-child(2) {
    position: absolute;
    top: rem(-5px);
    right: rem(-5px);
  }
}
</style>

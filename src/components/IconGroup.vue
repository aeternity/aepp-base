<template>
  <span class="icon-group">
    <slot />
  </span>
</template>

<style lang="scss" scoped>
@use '../styles/functions';

.icon-group {
  position: relative;

  > :nth-child(2) {
    position: absolute;
    top: functions.rem(-5px);
    right: functions.rem(-5px);
  }
}
</style>

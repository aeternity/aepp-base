<template>
  <div class="button-group">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.button-group {
  display: flex;
  align-content: stretch;

  > * {
    flex-grow: 1;
    flex-basis: 0;
  }
}
</style>

<template>
  <button
    class="button-plain"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.button-plain {
  border: none;
  background: transparent;
  padding: 0;

  &:focus:not([data-focus-visible-added]) {
    outline: none;
  }
}
</style>

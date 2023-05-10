<template>
  <div class="modal-header">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '../../styles/variables';
@use '../../styles/typography';

.modal-header {
  @extend %face-sans-l;
  font-weight: 500;
  color: variables.$color-neutral-minimum;
  text-align: center;
}
</style>

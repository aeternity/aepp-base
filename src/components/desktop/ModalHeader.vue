<template>
  <div class="modal-header">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import '../../styles/variables/colors.scss';
@import '../../styles/placeholders/typography.scss';

.modal-header {
  @extend %face-sans-l;
  font-weight: 500;
  color: $color-neutral-minimum;
  text-align: center;
}
</style>

<template>
  <div class="details-item">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import '../../styles/globals/functions.scss';
@import '../../styles/variables/colors.scss';

.details-item {
  padding: rem(16px) 0;
  border-top: rem(2px) solid rgba($color-neutral-negative-1, .2);
}
</style>

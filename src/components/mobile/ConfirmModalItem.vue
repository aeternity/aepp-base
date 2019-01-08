<template>
  <div class="confirm-modal-item">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.confirm-modal-item {
  padding: rem(22px) 0;
  border-top: rem(2px) solid rgba($color-neutral-negative-1, .2);
}
</style>

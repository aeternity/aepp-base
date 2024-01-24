<template>
  <div class="details-item">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '../../styles/variables';
@use '../../styles/functions';

.details-item {
  padding: functions.rem(16px) 0;
  border-top: functions.rem(2px) solid rgba(variables.$color-neutral-negative-1, .2);
}
</style>

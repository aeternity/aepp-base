<template>
  <div class="ae-button-group">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/variables';

.ae-button-group {
  display: flex;
  border-radius: 32px;
  overflow: hidden;

  ::v-deep .ae-button {
    min-width: 0;
    border-radius: 0;
    margin: 0;
    flex-grow: 1;

    &.primary {
      border-color: variables.$color-primary-negative-1;
    }

    &.secondary {
      border-color: variables.$color-secondary-negative-1;
    }

    &.neutral {
      border-color: variables.$color-neutral-positive-2;
    }

    &.alternative {
      border-color: variables.$color-alternative-negative-1;
    }
  }
}
</style>

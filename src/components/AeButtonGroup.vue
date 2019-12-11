<template>
  <div class="ae-button-group">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/variables';

.ae-button-group {
  display: flex;
  border-radius: 32px;
  overflow: hidden;

  >>> .ae-button {
    min-width: 0;
    border-radius: 0;
    margin: 0;
    flex-grow: 1;

    &.primary {
      border-color: $color-primary-negative-1;
    }

    &.secondary {
      border-color: $color-secondary-negative-1;
    }

    &.neutral {
      border-color: $color-neutral-positive-2;
    }

    &.alternative {
      border-color: $color-alternative-negative-1;
    }
  }
}
</style>

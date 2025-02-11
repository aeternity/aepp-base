<template>
  <Transition appear>
    <div class="progress-fake" />
  </Transition>
</template>

<style lang="scss" scoped>
@use '../styles/variables';
@use '../styles/functions';

.progress-fake {
  height: functions.rem(2px);
  background-color: variables.$color-neutral-positive-1;

  &::before {
    content: '';
    display: block;
    background-color: variables.$color-magenta;
    transition: width 60s cubic-bezier(0.05, 0.95, 0.05, 0.95);
    width: 80%;
    height: 100%;
  }

  &.v-enter::before {
    width: 0;
  }

  &.v-leave-active {
    transition-duration: 0.5s;

    &::before {
      transition: width 0.5s;
    }
  }

  &.v-leave-to::before {
    width: 100%;
  }
}
</style>

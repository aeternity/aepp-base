<template>
  <Transition appear>
    <div class="progress-fake" />
  </Transition>
</template>

<style lang="scss" scoped>
@import '../styles/functions';

.progress-fake {
  height: rem(2px);
  background-color: $color-neutral-positive-1;

  &::before {
    content: '';
    display: block;
    background-color: $color-magenta;
    transition: width 60s cubic-bezier(.05, .95, .05, .95);
    width: 80%;
    height: 100%;
  }

  &.v-enter::before {
    width: 0;
  }

  &.v-leave-active {
    transition-duration: .5s;

    &::before {
      transition: width .5s;
    }
  }

  &.v-leave-to::before {
    width: 100%;
  }
}
</style>

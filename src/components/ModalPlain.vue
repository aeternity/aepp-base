<template>
  <Transition appear name="scale">
    <div class="modal-plain">
      <slot />
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@use '../styles/functions';

.modal-plain {
  margin: auto;
  border-radius: functions.rem(8px);
  box-shadow: 0 0 functions.rem(8px) rgba(#1b4479, 0.1);
  background: #fff;
  overflow: hidden;

  &.scale-enter-active {
    transition: transform 0.2s ease-out;
  }

  &.scale-enter {
    transform: scale(0);
  }
}
</style>

<template>
  <Transition
    appear
    name="scale"
  >
    <div class="modal-plain">
      <slot />
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';

.modal-plain {
  margin: auto;
  border-radius: rem(8px);
  box-shadow: 0 0 rem(8px) rgba(#1B4479, 0.1);
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

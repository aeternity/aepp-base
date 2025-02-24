<template>
  <Transition>
    <Overlay class="sidebar-modal" @click="$emit('close')">
      <div class="modal">
        <slot />
      </div>
    </Overlay>
  </Transition>
</template>

<script>
import Overlay from '../Overlay.vue';

export default {
  components: { Overlay },
};
</script>

<style scoped lang="scss">
@use '../../styles/variables';
@use '../../styles/functions';

.sidebar-modal.overlay {
  $width: functions.rem(390px);

  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: #fff;
    width: $width;
    overflow-y: auto;
    overflow-x: hidden;
  }

  &.v-enter-active,
  &.v-leave-active {
    transition: background-color 0.5s;

    .modal {
      transition: right 0.5s;
    }
  }

  &.v-enter,
  &.v-leave-to {
    background-color: rgba(variables.$color-neutral-minimum, 0);

    .modal {
      right: -$width;
    }
  }
}
</style>

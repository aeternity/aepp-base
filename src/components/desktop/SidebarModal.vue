<template>
  <Transition>
    <AeOverlay
      class="sidebar-modal"
      @click="$emit('close')"
    >
      <div class="modal">
        <slot />
      </div>
    </AeOverlay>
  </Transition>
</template>

<script>
import { AeOverlay } from '@aeternity/aepp-components';

export default {
  components: { AeOverlay },
};
</script>

<style scoped lang="scss">
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.sidebar-modal.ae-overlay {
  background: rgba($color-neutral-minimum, .7);
  $width: rem(390px);

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

  &.v-enter-active, &.v-leave-active {
    transition: background-color .5s;

    .modal {
      transition: right .5s;
    }
  }

  &.v-enter, &.v-leave-to {
    background-color: rgba($color-neutral-minimum, 0);

    .modal {
      right: -$width;
    }
  }
}
</style>

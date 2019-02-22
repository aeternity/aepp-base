<template>
  <AeOverlay
    class="ae-modal"
    @click="$emit('close')"
  >
    <Transition
      appear
      name="scale"
    >
      <div class="modal">
        <slot />
      </div>
    </Transition>
  </AeOverlay>
</template>

<script>
import { AeOverlay } from '@aeternity/aepp-components-3';

export default {
  components: { AeOverlay },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';

.ae-overlay.ae-modal {
  display: flex;
  padding: rem(20px);
  box-sizing: border-box;
  background-image: none;
  background-color: rgba($color-neutral-minimum, 0.7);

  .modal {
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
}
</style>

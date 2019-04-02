<template>
  <div class="footer-modal">
    <Transition name="fade">
      <AeOverlay
        v-if="$slots.default"
        @click="$emit('toggle')"
      />
    </Transition>
    <div class="modal">
      <Transition name="scroll">
        <div
          v-if="$slots.default"
          class="content"
        >
          <slot />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
import { AeOverlay } from '@aeternity/aepp-components-3';

export default {
  components: { AeOverlay },
};
</script>

<style scoped lang="scss">
.footer-modal {
  .ae-overlay {
    background: rgba(#000, .6);

    &.fade-enter-active, &.fade-leave-active {
      transition: opacity .5s;
    }
    &.fade-enter, &.fade-leave-to {
      opacity: 0;
    }
  }

  .modal {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 2px solid #f0f0f0;
    background-color: #fff;

    .content {
      height: 450px;
      margin: 0 40px;
      overflow: auto;

      &.scroll-enter-active, &.scroll-leave-active {
        transition: height .5s;
      }
      &.scroll-enter, &.scroll-leave-to {
        height: 0;
      }
    }
  }
}
</style>

<template>
  <Overlay
    class="ae-modal"
    @click="$emit('close')"
  >
    <ModalPlain>
      <slot />
    </ModalPlain>
  </Overlay>
</template>

<script>
import Overlay from './Overlay.vue';
import ModalPlain from './ModalPlain.vue';

export default {
  components: { Overlay, ModalPlain },
};
</script>

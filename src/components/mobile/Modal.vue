<template>
  <OverlayGrayscale
    class="modal-mobile"
    @click="$emit('close')"
  >
    <ModalPlain>
      <slot />
    </ModalPlain>
  </OverlayGrayscale>
</template>

<script>
import OverlayGrayscale from './OverlayGrayscale.vue';
import ModalPlain from '../ModalPlain.vue';

export default {
  components: { OverlayGrayscale, ModalPlain },
};
</script>

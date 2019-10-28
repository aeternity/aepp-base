<template>
  <Overlay
    class="modal-mobile"
    v-on="$listeners"
  >
    <ModalPlain>
      <slot />
    </ModalPlain>

    <slot name="footer" />
  </Overlay>
</template>

<script>
import Overlay from '../Overlay.vue';
import ModalPlain from '../ModalPlain.vue';

export default {
  components: { Overlay, ModalPlain },
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.modal-mobile {
  background-color: rgba($color-neutral-positive-2, 0.8);
}
</style>

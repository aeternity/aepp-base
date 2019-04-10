<template>
  <Fragment>
    <div class="overlay-grayscale" />
    <Overlay v-on="$listeners">
      <slot />
    </Overlay>
  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment';
import Overlay from '../Overlay.vue';

export default {
  components: { Fragment, Overlay },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.overlay-grayscale {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #000;
  mix-blend-mode: hue;
}

.overlay {
  background-color: rgba($color-neutral-positive-2, 0.8);
}
</style>

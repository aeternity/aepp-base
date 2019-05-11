<template>
  <div class="store-load-error">
    <div>
      <p>Base app failed to load its state.</p>

      <AeButton
        fill="secondary"
        @click="resetState"
      >
        Reset All Data
      </AeButton>
    </div>
  </div>
</template>

<script>
import AeButton from '../components/AeButton.vue';
import { resetState } from '../store/plugins/persistState';

export default {
  components: { AeButton },
  methods: { resetState },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';

.store-load-error {
  min-height: 100%;
  display: flex;
  background-color: $color-primary;

  div {
    margin: auto;
    text-align: center;

    p {
      @extend %face-sans-l;
      color: $color-neutral-maximum;
    }
  }
}
</style>

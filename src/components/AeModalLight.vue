<template>
  <ae-overlay>
    <div class="ae-modal-light">
      <h1>{{ title }}</h1>
      <main>
        <slot />
      </main>
      <div class="buttons">
        <slot name="buttons">
          <ae-button
            v-if="closeButton"
            size="small"
            plain
            uppercase
            @click="$emit('close');"
          >close</ae-button>
        </slot>
      </div>
    </div>
  </ae-overlay>
</template>

<script>
import { AeOverlay } from '@aeternity/aepp-components-3';
import AeButton from './AeButton.vue';

export default {
  components: { AeOverlay, AeButton },
  props: {
    title: {
      type: String,
      default: undefined,
    },
    closeButton: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';

.ae-overlay {
  display: flex;
  padding: rem(10px);
  box-sizing: border-box;
  background-image: linear-gradient(
    to bottom, rgba($color-neutral-negative-3, 0.3), rgba($color-neutral-negative-3, 0.3)
  );

  .ae-modal-light {
    margin: auto;
    padding: rem(60px) rem(60px);
    border-radius: rem(8px);
    box-shadow: 0 0 rem(8px) 0 rgba(#1B4479, 0.1);;
    background: $color-neutral-maximum;

    h1 {
      margin: rem(10px) 0 rem(16px) 0;
      @extend %face-sans-l;
      font-size: rem(36px);
      font-weight: 500;
    }

    main {
      @extend %face-sans-s;
      font-weight: 500;
    }

    .buttons {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>

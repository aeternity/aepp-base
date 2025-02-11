<template>
  <div class="fullscreen-prompt">
    <div>
      <p>{{ message }}</p>

      <AeButton v-if="buttonText" fill="secondary" @click="$emit('button-click')">
        {{ buttonText }}
      </AeButton>
    </div>

    <slot />
  </div>
</template>

<script>
import AeButton from '../components/AeButton.vue';

export default {
  components: { AeButton },
  props: {
    message: { type: String, required: true },
    buttonText: { type: String, default: '' },
  },
};
</script>

<style lang="scss" scoped>
@use '../styles/variables';
@use '../styles/functions';
@use '../styles/typography';

.fullscreen-prompt {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: functions.rem(16px);
  background-color: variables.$color-primary;

  div {
    max-width: functions.rem(250px);
    margin: auto;
    text-align: center;

    p {
      @extend %face-sans-l;
      color: variables.$color-neutral-maximum;
    }

    .ae-button {
      min-width: 0;
      width: 100%;
      margin-left: 0;
      margin-right: 0;
    }
  }
}
</style>

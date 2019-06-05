<template>
  <Modal class="alert-modal">
    {{ text }}

    <AeButton @click="resolve">
      {{ buttonText }}
    </AeButton>
  </Modal>
</template>

<script>
import Modal from './mobile/Modal.vue';
import AeButton from './AeButton.vue';

export default {
  components: { Modal, AeButton },
  props: {
    text: { type: String, required: true },
    buttonText: { type: String, default: 'Ok' },
    resolve: { type: Function, required: true },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/placeholders/typography.scss';

.alert-modal {
  @extend %face-sans-base;

  /deep/ .modal-plain {
    max-width: rem(375px);
    padding: rem(30px);
  }

  .ae-button {
    display: block;
    margin: rem(20px) auto 0 auto;
    padding: 0 rem(20px);
    min-width: rem(150px);
  }
}
</style>

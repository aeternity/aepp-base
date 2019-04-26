<template>
  <Modal class="desktop-guide-modal">
    The Base æpp can currently work only when opened in a single browser tab.
    Please close any additional instances (tabs) running the Base æpp.

    <AeButton @click="resolve">
      Ok
    </AeButton>
  </Modal>
</template>

<script>
import Modal from '../mobile/Modal.vue';
import AeButton from '../AeButton.vue';

export default {
  components: {
    Modal,
    AeButton,
  },
  props: {
    resolve: { type: Function, required: true },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.desktop-guide-modal {
  /deep/ .modal-plain {
    max-width: rem(375px);
    padding: rem(30px);
    background-color: $color-neutral-positive-3;
    @extend %face-sans-s;
    font-size: rem(20px);
    text-align: left;

    em {
      font-style: normal;
      color: $color-primary;
    }
  }

  .ae-button {
    display: block;
    min-width: 90%;
    margin: rem(20px) auto 0 auto;
  }
}
</style>

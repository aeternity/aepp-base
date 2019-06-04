<template>
  <AeModal class="cancel-sign-modal">
    <Guide size="big">
      Sign the transaction in the <em> Base æpp </em>
      <div class="note">
        Open your Base æpp, check the transaction details and sign
      </div>
    </Guide>
    <img src="../../assets/base-aepp-confirm.svg">
    <AeButton @click="resolve">
      Cancel Transaction
    </AeButton>
  </AeModal>
</template>

<script>
import AeModal from '../AeModal.vue';
import AeButton from '../AeButton.vue';
import Guide from '../Guide.vue';

export default {
  components: {
    AeModal,
    AeButton,
    Guide,
  },
  props: {
    resolve: { type: Function, required: true },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/placeholders/typography.scss';

.cancel-sign-modal {
  /deep/ .modal-plain {
    text-align: center;
    padding: rem(50px) rem(70px) rem(70px) rem(70px);

    .note {
      @extend %face-sans-base;
      font-weight: normal;
      margin-top: rem(5px);
    }

    img {
      height: rem(270px);
    }

    .ae-button {
      display: block;
      margin-top: rem(53px);
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>

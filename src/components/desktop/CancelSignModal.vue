<template>
  <AeModal class="cancel-sign-modal">
    <Guide size="big">
      Sign the transaction in the <em>Base æpp</em>
    </Guide>
    <div class="note">
      Open your Base æpp, check the transaction details and sign
    </div>
    <img src="../../assets/base-aepp-confirm.svg">
    <AeButton @click="resolve">
      Cancel Transaction
    </AeButton>
  </AeModal>
</template>

<script>
import AeModal from '../AeModal.vue';
import Guide from '../Guide.vue';
import AeButton from '../AeButton.vue';

export default {
  components: { AeModal, Guide, AeButton },
  props: {
    resolve: { type: Function, required: true },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/placeholders/typography.scss';
@import '../../styles/variables/colors.scss';

.cancel-sign-modal {
  text-align: center;

  /deep/ .modal-plain {
    padding: rem(50px) rem(70px) rem(70px) rem(70px);
  }

  .guide {
    margin-bottom: rem(5px);
  }

  .note {
    @extend %face-sans-base;
    color: $color-neutral-negative-3;
  }

  img {
    display: block;
    height: rem(300px);
    margin: rem(40px) auto;
  }
}
</style>

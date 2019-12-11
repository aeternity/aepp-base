<template>
  <AeModal class="cancel-sign-modal">
    <Guide
      :template="$t('remote-connection.modal.cancel-sign.guide')"
      size="big"
    />
    <div class="note">
      {{ $t('remote-connection.modal.cancel-sign.note') }}
    </div>
    <img src="../../assets/base-aepp-confirm.svg">
    <AeButton @click="resolve">
      {{ $t('remote-connection.modal.cancel-sign.cancel') }}
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
@import '../../styles/typography';

.cancel-sign-modal {
  text-align: center;

  >>> .modal-plain {
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

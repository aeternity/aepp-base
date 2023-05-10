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
@use '../../styles/variables';
@use '../../styles/functions';
@use '../../styles/typography';

.cancel-sign-modal {
  text-align: center;

  ::v-deep .modal-plain {
    padding: functions.rem(50px) functions.rem(70px) functions.rem(70px) functions.rem(70px);
  }

  .guide {
    margin-bottom: functions.rem(5px);
  }

  .note {
    @extend %face-sans-base;
    color: variables.$color-neutral-negative-3;
  }

  img {
    display: block;
    height: functions.rem(300px);
    margin: functions.rem(40px) auto;
  }
}
</style>

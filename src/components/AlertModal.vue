<template>
  <Modal class="alert-modal">
    {{ text }}

    <AeButtonGroup>
      <AeButton
        v-if="confirm"
        fill="secondary"
        @click="cancelHandler"
      >
        {{ $t('cancel') }}
      </AeButton>
      <AeButton @click="resolve">
        {{ primaryButtonText }}
      </AeButton>
    </AeButtonGroup>
  </Modal>
</template>

<script>
import Modal from './mobile/Modal.vue';
import AeButton from './AeButton.vue';
import AeButtonGroup from './AeButtonGroup.vue';

export default {
  components: { Modal, AeButtonGroup, AeButton },
  props: {
    text: { type: String, required: true },
    primaryButtonText: {
      type: String,
      default() { return this.$t('ok'); },
    },
    resolve: { type: Function, required: true },
    reject: { type: Function, required: true },
    confirm: Boolean,
  },
  methods: {
    cancelHandler() {
      this.reject(new Error('Cancelled by user'));
    },
  },
};
</script>

<style lang="scss" scoped>
@use '../styles/functions';
@use '../styles/typography';

.alert-modal {
  @extend %face-sans-base;

  ::v-deep .modal-plain {
    max-width: functions.rem(375px);
    padding: functions.rem(30px);
  }

  .ae-button-group {
    margin: functions.rem(20px) auto 0 auto;
    min-width: functions.rem(210px);

    .ae-button {
      flex-basis: 0;
      padding: 0 functions.rem(20px);
    }
  }
}
</style>

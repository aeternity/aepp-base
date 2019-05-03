<template>
  <FooterModal class="cancel-sign-modal">
    <div class="modal">
      <h1>Sign the transaction in the Base æpp</h1>
      <Step>
        <AeAppIcon
          :src="require('../../assets/icons/base.svg')"
          class="base"
        />
        <h2>Base</h2>
        <p>Open your Base æpp, check the transaction details and sign</p>
      </Step>
      <div>
        <AeButton @click="resolve">
          Cancel Transaction
        </AeButton>
      </div>
    </div>
  </FooterModal>
</template>

<script>
import { AeAppIcon } from '@aeternity/aepp-components-3';
import AeButton from '../AeButton.vue';
import Step from './Step.vue';
import FooterModal from './FooterModal.vue';

export default {
  components: {
    FooterModal, Step, AeAppIcon, AeButton,
  },
  props: {
    resolve: { type: Function, required: true },
  },
};
</script>

<style scoped lang="scss">
.cancel-sign-modal .modal {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  text-align: center;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 24px;
  }

  .step {
    flex-shrink: 0;
    max-width: 250px;
  }

  .ae-button {
    margin-bottom: 60px;
  }
}
</style>

<template>
  <div class="waiting-for-confirmation">
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
      <AeButton
        v-if="signingCancelable"
        @click="cancelTransaction"
      >
        Cancel Transaction
      </AeButton>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { AeAppIcon } from '@aeternity/aepp-components-3';
import AeButton from '../AeButton.vue';
import Step from './Step.vue';

export default {
  components: { Step, AeAppIcon, AeButton },
  computed: mapGetters(['signingCancelable']),
  methods: mapMutations(['cancelTransaction']),
};
</script>

<style scoped lang="scss">
.waiting-for-confirmation {
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

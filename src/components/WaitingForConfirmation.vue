<template>
  <div class="waiting-for-confirmation">
    <h1>Sign the transaction in the Bæse æpp</h1>
    <step>
      <ae-app-icon
        :src="require('../assets/icons/base.svg')"
        class="base" />
      <h2>Bæse</h2>
      <p>Open your Bæse æpp, check the transaction details and sign</p>
    </step>
    <div>
      <ae-button
        v-if="signingCancelable"
        type="dramatic"
        @click="cancelTransaction">Cancel Transaction</ae-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { AeAppIcon, AeButton } from '@aeternity/aepp-components';
import Step from './Step.vue';

export default {
  components: { Step, AeAppIcon, AeButton },
  computed: mapGetters(['signingCancelable']),
  methods: mapMutations(['cancelTransaction']),
};
</script>

<style scoped lang="scss">
@import '~@aeternity/aepp-components/dist/variables.scss';

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

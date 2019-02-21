<template>
  <div class="send-confirm">
    <ae-loader />
  </div>
</template>

<script>
import BigNumber from 'bignumber.js';
import { MAGNITUDE } from '../../lib/constants';
import AeLoader from '../../components/AeLoader.vue';

export default {
  components: { AeLoader },
  props: {
    to: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
  },
  async mounted() {
    try {
      this.$store.commit('setStepFraction', {
        numerator: 3,
        denominator: 3,
      });
      const { hash } = await this.$store.state.sdk.spend(
        BigNumber(this.amount).shiftedBy(MAGNITUDE),
        this.to,
      );
      this.$store.commit('setStepFraction');

      this.$router.push({
        name: 'transfer',
        params: { transactionHash: hash, amount: this.amount },
      });
    } catch (e) {
      if (e.message === 'Rejected by user') {
        this.$router.push({ name: 'transfer' });
        return;
      }
      throw e;
    }
  },
};
</script>

<style lang="scss" scoped>
.send-confirm {
  flex-grow: 1;
  display: flex;

  .ae-loader {
    margin: auto;
  }
}
</style>

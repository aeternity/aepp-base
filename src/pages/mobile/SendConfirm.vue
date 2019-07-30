<template>
  <div class="send-confirm">
    <AeLoader />
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
      const amount = BigNumber(this.amount);
      if (this.$store.state.sdk.then) await this.$store.state.sdk;
      const { hash } = await this.$store.state.sdk.spend(amount.shiftedBy(MAGNITUDE), this.to);

      this.$router.push({ name: 'transfer' });
      this.$store.dispatch('modals/open', {
        name: 'spendSuccess',
        transactionHash: hash,
        amount,
      });
    } catch (e) {
      if (['Rejected by user', 'Not implemented yet', 'Cancelled by user'].includes(e.message)) {
        this.$router.push({ name: 'transfer' });
        return;
      }
      throw e;
    } finally {
      this.$store.commit('setStepFraction');
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

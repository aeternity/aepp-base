<template>
  <div class="send-confirm">
    <ae-loader />
  </div>
</template>

<script>
import BigNumber from 'bignumber.js';
import { mapGetters, mapState } from 'vuex';
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
  computed: {
    ...mapGetters(['activeIdentity']),
    ...mapState(['epoch']),
  },
  async mounted() {
    try {
      const signedTx = await this.$store.dispatch('signTransaction', {
        transaction: {
          amount: BigNumber(this.amount),
          senderId: this.activeIdentity.address,
          recipientId: this.to,
          payload: '',
          ttl: Number.MAX_SAFE_INTEGER,
        },
      });
      const { txHash } = await this.epoch.api.postTransaction({ tx: signedTx });
      this.$router.push({
        name: 'transfer',
        params: { transactionHash: txHash, amount: this.amount },
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

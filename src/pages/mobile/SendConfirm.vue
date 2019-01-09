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
    const amount = BigNumber(this.amount);
    const recipientId = this.to;
    let fee;
    try {
      fee = await this.$store.dispatch('modals/confirmSpendTx', {
        amount,
        recipientId,
        stepIcon: '³⁄₃',
      });
    } catch {
      this.$router.push({ name: 'transfer' });
      return;
    }

    const signedTx = await this.$store.dispatch('signTransaction', {
      transaction: {
        fee,
        amount,
        senderId: this.activeIdentity.address,
        recipientId,
        payload: '',
        ttl: Number.MAX_SAFE_INTEGER,
      },
      acceptImmediately: true,
    });
    const { txHash } = await this.epoch.api.postTransaction({ tx: signedTx });

    this.$router.push({ name: 'transfer', params: { transactionHash: txHash, amount: this.amount } });
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

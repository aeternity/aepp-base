<template>
  <div v-if="message" class="connection-status" :class="message.className">
    {{ message.text }}
  </div>
</template>

<script>
import { pick } from 'lodash-es';
import { mapState } from 'vuex';

export default {
  subscriptions() {
    return pick(this.$store.state.observables, ['middlewareStatus']);
  },
  computed: mapState({
    message({ onLine, sdk }) {
      if (!onLine) return { text: this.$t('network.connection-status.offline') };
      if (!sdk) return { text: this.$t('network.connection-status.no-sdk') };
      if (sdk.then)
        return { text: this.$t('network.connection-status.connecting'), className: 'connecting' };
      if (!this.middlewareStatus) {
        return {
          text: this.$t('network.connection-status.middleware.unavailable'),
          className: 'connecting',
        };
      }
      if (!this.middlewareStatus.loading && !this.middlewareStatus.mdwSynced) {
        return {
          text: this.$t('network.connection-status.middleware.blocks-to-sync', {
            blocks: this.middlewareStatus.nodeHeight - this.middlewareStatus.mdwHeight,
          }),
          className: 'connecting',
        };
      }
      if (process.env.NODE_ENV === 'production' && sdk.getNetworkId() !== 'ae_mainnet') {
        return {
          text: this.$t('network.connection-status.connected-to-testnet'),
          className: 'test-net',
        };
      }
      return null;
    },
  }),
};
</script>

<style lang="scss" scoped>
@use '../styles/variables';
@use '../styles/functions';
@use '../styles/typography';

.connection-status {
  padding: functions.rem(6px);
  @extend %face-sans-xs;
  color: #fff;
  text-align: center;
  background-color: variables.$color-primary;

  &.test-net,
  &.connecting {
    background-color: variables.$color-secondary;
  }
}
</style>

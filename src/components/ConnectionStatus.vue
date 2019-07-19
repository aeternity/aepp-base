<template>
  <div
    v-if="message"
    class="connection-status"
    :class="message.className"
  >
    {{ message.text }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState({
    message: ({ onLine, sdk, desktop }) => {
      if (desktop && desktop.remoteConnected && !desktop.leaderConnected) {
        return {
          text: `You are currently not connected to a mobile wallet.
          Working in offline mode.`,
        };
      }
      if (!onLine) return { text: 'You are offline... Please check your connection.' };
      if (!sdk) return { text: 'We are unable to connect to the chosen node.' };
      if (sdk.then) return { text: 'Connecting to the network...', className: 'connecting' };
      if (process.env.NODE_ENV === 'production' && sdk.nodeNetworkId !== 'ae_mainnet') {
        return { text: 'You are connected to a testnet.', className: 'test-net' };
      }
      return null;
    },
  }),
};
</script>

<style lang="scss" scoped>
@import '../styles/placeholders/typography.scss';
@import '../styles/variables/colors.scss';

.connection-status {
  padding: rem(6px);
  @extend %face-sans-xs;
  color: #fff;
  text-align: center;
  background-color: $color-primary;

  &.test-net,
  &.connecting {
    background-color: $color-secondary;
  }
}
</style>

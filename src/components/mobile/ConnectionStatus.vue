<template>
  <div
    v-if="message"
    class="connection-status"
    :class="className"
  >
    {{ message }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState({
    message: ({ onLine, sdk }) => {
      if (!onLine) return 'You are offline... Please check your connection.';
      if (!sdk) return 'We are unable to connect to the chosen node.';
      if (process.env.NODE_ENV === 'production' && sdk.nodeNetworkId !== 'ae_mainnet') {
        return 'You are connected to a testnet.';
      }
      return '';
    },
    className: ({ sdk }) => {
      if (process.env.NODE_ENV === 'production' && sdk && sdk.nodeNetworkId !== 'ae_mainnet') {
        return 'test-net';
      }
      return '';
    },
  }),
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.connection-status {
  padding: rem(6px);
  @extend %face-sans-xs;
  color: #fff;
  text-align: center;
  background-color: $color-primary;

  &.test-net {
    background-color: $color-secondary;
  }
}
</style>

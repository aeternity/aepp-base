<template>
  <ListItem
    v-bind="$attrs"
    class="list-item-transaction"
    :class="{ pending }"
    :title="peerName || (peerAddress && formatAddress(peerAddress))"
    :title-monospace="!peerName"
    :subtitle="pending ? $t('transfer.transaction.pending') : time.toLocaleTimeString()"
    subtitle-monospace
    v-on="$listeners"
  >
    <template v-if="peerAddress">
      <AeIdenticon slot="icon" :address="peerAddress" />
    </template>

    <div slot="right" class="balance-change">
      <template v-if="tx.amount">
        <span :class="received ? 'plus' : 'minus'" />&nbsp;{{ convertedAmount }}
      </template>
      <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
      <small>{{ tx.fee | prefixedAmount }}&nbsp;AE</small>
    </div>
  </ListItem>
</template>

<script>
import { mapState } from 'vuex';
import prefixedAmount from '../filters/prefixedAmount';
import formatAddress from '../filters/formatAddress';
import ListItem from './ListItem.vue';
import AeIdenticon from './AeIdenticon.vue';

export default {
  components: { ListItem, AeIdenticon },
  filters: { prefixedAmount },
  props: {
    pending: Boolean,
    received: Boolean,
    time: { type: Date, default: null },
    peerId: { type: String, default: '' },
    tx: { type: Object, required: true },
    convertedAmount: { type: String, default: '' },
  },
  computed: mapState('names', {
    peerName(state, { get }) {
      if (!this.peerId) return this.$t('transfer.transaction.type')[this.tx.type];
      return get(this.peerId);
    },
    peerAddress(state, { getAddress }) {
      return this.peerId && getAddress(this.peerId);
    },
  }),
  methods: { formatAddress },
};
</script>

<style lang="scss" scoped>
@use '../styles/variables';
@use '../styles/functions';
@use '../styles/typography';

.list-item-transaction {
  &.pending ::v-deep .label .subtitle {
    text-transform: uppercase;
    color: variables.$color-primary;
  }

  .balance-change {
    @extend %face-mono-xs;
    font-weight: bold;
    color: variables.$color-neutral-negative-3;
    text-align: right;

    .plus:after {
      color: variables.$color-alternative;
      content: '+';
    }

    .minus:after {
      color: variables.$color-primary;
      content: '—';
    }

    small {
      display: block;
      @extend %face-sans-xs;
      font-size: functions.rem(11px);
      font-weight: normal;
      color: variables.$color-neutral-negative-1;
    }
  }
}
</style>

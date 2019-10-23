<template>
  <ListItem
    v-bind="$attrs"
    class="list-item-transaction"
    :class="{ pending }"
    :title="peerName || formatAddress(peerId)"
    :title-monospace="!peerName"
    :subtitle="pending
      ? $t('transfer.transaction.pending')
      : time.toLocaleTimeString()"
    subtitle-monospace
    v-on="$listeners"
  >
    <template v-if="peerId">
      <AeIdenticon
        slot="icon"
        :address="peerId"
      />
    </template>

    <div
      slot="right"
      class="balance-change"
    >
      <template v-if="tx.amount">
        <span :class="received ? 'plus' : 'minus'" />&nbsp;{{ convertedAmount }}
      </template>
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
  }),
  methods: { formatAddress },
};
</script>

<style lang="scss" scoped>
@import '../styles/typography';

.list-item-transaction {
  &.pending /deep/ .label .subtitle {
    text-transform: uppercase;
    color: $color-primary;
  }

  .balance-change {
    @extend %face-mono-xs;
    font-weight: bold;
    color: $color-neutral-negative-3;
    text-align: right;

    .plus:after {
      color: $color-alternative;
      content: '+';
    }

    .minus:after {
      color: $color-primary;
      content: '—';
    }

    small {
      display: block;
      @extend %face-sans-xs;
      font-size: rem(11px);
      font-weight: normal;
      color: $color-neutral-negative-1;
    }
  }
}
</style>

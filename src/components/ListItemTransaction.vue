<template>
  <ListItem
    v-bind="$attrs"
    class="list-item-transaction"
    subtitle-monospace
    v-on="$listeners"
  >
    <template v-if="peerId">
      <AeIdenticon
        slot="icon"
        :address="peerId"
      />

      <AeAddress
        slot="title"
        :address="peerId"
        length="short"
      />
    </template>

    <template slot="subtitle">
      <span
        v-if="pending"
        class="pending"
      >
        Pending
      </span>
      <template v-else>
        {{ time.toLocaleTimeString() }}
      </template>
    </template>

    <div
      slot="right"
      class="balance-change"
    >
      <span :class="received ? 'plus' : 'minus'" />&nbsp;{{ tx.amount | prefixedAmount }}&nbsp;AE
      <small>{{ tx.fee | prefixedAmount }}&nbsp;AE</small>
    </div>
  </ListItem>
</template>

<script>
import { mapGetters } from 'vuex';
import prefixedAmount from '../filters/prefixedAmount';
import ListItem from './ListItem.vue';
import AeIdenticon from './AeIdenticon.vue';
import AeAddress from './AeAddress.vue';

export default {
  components: { ListItem, AeIdenticon, AeAddress },
  filters: { prefixedAmount },
  props: {
    pending: Boolean,
    received: Boolean,
    time: { type: Date, default: null },
    peerId: { type: String, default: '' },
    tx: { type: Object, required: true },
  },
  computed: mapGetters({ activeAccount: 'accounts/active' }),
};
</script>

<style lang="scss" scoped>
@import '../styles/placeholders/typography.scss';
@import '../styles/variables/colors.scss';

.list-item-transaction {
  .ae-address {
    @extend %face-mono-s;
    font-weight: bold;
    color: $color-neutral-negative-3;
  }

  .pending {
    @extend %face-uppercase-xs;
    font-weight: bold;
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

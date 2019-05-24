<template>
  <ListItem
    v-bind="$attrs"
    class="list-item-transaction"
    subtitle-monospace
    v-on="$listeners"
  >
    <AeIdenticon
      slot="icon"
      :address="peerId"
    />

    <AeAddress
      slot="title"
      :address="peerId"
      length="short"
    />

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
      <span :class="received ? 'plus' : 'minus'" />
      <Balance :balance="tx.amount" />
      <small><Balance :balance="tx.fee" /></small>
    </div>
  </ListItem>
</template>

<script>
import { mapGetters } from 'vuex';
import ListItem from './ListItem.vue';
import AeIdenticon from './AeIdenticon.vue';
import AeAddress from './AeAddress.vue';
import Balance from './Balance.vue';

export default {
  components: {
    ListItem, AeIdenticon, AeAddress, Balance,
  },
  props: {
    pending: { type: Boolean },
    received: { type: Boolean },
    time: { type: Date, required: true },
    peerId: { type: String, required: true },
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
    color: $color-primary;
    text-align: right;

    .plus {
      color: $color-alternative;

      &:after {
        content: '+';
      }
    }

    .minus {
      color: $color-primary;

      &:after {
        content: '—';
      }
    }

    .balance {
      @extend %face-mono-xs;
      font-weight: bold;
      color: $color-neutral-negative-3;
    }

    small {
      display: block;

      .balance {
        @extend %face-sans-xs;
        font-size: rem(11px);
        font-weight: normal;
        color: $color-neutral-negative-1;
      }
    }
  }
}
</style>

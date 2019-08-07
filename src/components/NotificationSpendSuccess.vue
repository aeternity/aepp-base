<template>
  <Notification
    v-bind="$attrs"
    class="notification-spend-success"
  >
    <ListItem
      :title="$t('transfer.send.resolved.title')"
      :subtitle="$t('transfer.send.resolved.subtitle', { amount: convertedAmount })"
    >
      <ListItemCircle slot="icon">
        <Check />
      </ListItemCircle>
    </ListItem>

    <template slot="footer">
      <AeButton
        :to="{ name: 'transaction-details', params: { hash: transactionHash } }"
        fill="dark"
        size="small"
        plain
      >
        {{ $t('transfer.send.resolved.to-history') }}
      </AeButton>
      <AeButton
        v-copy-on-click="transactionHash"
        fill="dark"
        size="small"
        plain
      >
        {{ $t('transfer.send.resolved.copy') }}
      </AeButton>
    </template>
  </Notification>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import BigNumber from 'bignumber.js';
import Notification from './Notification.vue';
import ListItem from './ListItem.vue';
import ListItemCircle from './ListItemCircle.vue';
import { Check } from './icons';
import AeButton from './AeButton.vue';
import prefixedAmount from '../filters/prefixedAmount';
import currencyAmount from '../filters/currencyAmount';
import copyOnClick from '../directives/copyOnClick';

export default {
  components: {
    Notification,
    ListItem,
    ListItemCircle,
    Check,
    AeButton,
  },
  directives: { copyOnClick },
  props: {
    amount: { type: BigNumber, required: true },
    transactionHash: { type: String, required: true },
  },
  computed: {
    ...mapState('currencies', ['swapped']),
    ...mapGetters('currencies', ['active']),
    convertedAmount() {
      return this.swapped
        ? currencyAmount(this.amount.multipliedBy(this.rate), this.active)
        : currencyAmount(prefixedAmount(this.amount), { symbol: 'AE' });
    },
  },
  methods: { prefixedAmount },
  subscriptions() {
    return { rate: this.$store.state.observables.rate };
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables/colors.scss';

.notification-spend-success .list-item-circle {
  background-color: $color-alternative;
}
</style>

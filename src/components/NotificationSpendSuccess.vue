<template>
  <Notification v-bind="$attrs" class="notification-spend-success">
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
      <AeButton v-copy-on-click="transactionHash" fill="dark" size="small" plain>
        {{ $t('transfer.send.resolved.copy') }}
      </AeButton>
    </template>
  </Notification>
</template>

<script>
import BigNumber from 'bignumber.js';
import Notification from './Notification.vue';
import ListItem from './ListItem.vue';
import ListItemCircle from './ListItemCircle.vue';
import { Check } from './icons';
import AeButton from './AeButton.vue';
import prefixedAmount from '../filters/prefixedAmount';
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
  methods: { prefixedAmount },
  subscriptions() {
    return { convertedAmount: this.$store.state.observables.convertAmount(() => this.amount) };
  },
};
</script>

<style lang="scss" scoped>
@use '../styles/variables';
@use 'copied';

.notification-spend-success {
  .list-item-circle {
    background-color: variables.$color-alternative;
  }

  .ae-button.v-copied {
    @extend %copied;
  }
}
</style>

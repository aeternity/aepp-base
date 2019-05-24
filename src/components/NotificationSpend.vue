<template>
  <Notification
    v-bind="$attrs"
    class="notification-spend"
  >
    <ListItem
      title="Transfer completed"
      :subtitle="`You've sent ${ prefixedAmount(amount) } AE`"
    >
      <ListItemCircle slot="icon">
        <Check />
      </ListItemCircle>
    </ListItem>

    <template slot="footer">
      <AeButton
        :to="$globals.IS_MOBILE_DEVICE
          ? { name: 'transaction-details', params: { hash: transactionHash } }
          : `${currentNetwork.explorerUrl}/#/tx/${transactionHash}`"
        fill="dark"
        size="small"
        plain
      >
        View {{ $globals.IS_MOBILE_DEVICE ? 'in history' : 'on explorer' }}
      </AeButton>
      <AeButton
        v-copy-on-click="transactionHash"
        fill="dark"
        size="small"
        plain
      >
        Copy tx hash
      </AeButton>
    </template>
  </Notification>
</template>

<script>
import BigNumber from 'bignumber.js';
import { mapGetters } from 'vuex';
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
  computed: mapGetters(['currentNetwork']),
  methods: { prefixedAmount },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.notification-spend .list-item-circle {
  background-color: $color-alternative;
}
</style>

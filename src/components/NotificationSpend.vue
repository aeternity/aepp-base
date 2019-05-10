<template>
  <Notification
    v-bind="$attrs"
    class="notification-spend"
  >
    <ListItem
      title="Transfer completed"
      :subtitle="`You've sent ${ prefixedAmount(amount) } AE`"
    >
      <AeIcon
        slot="icon"
        fill="alternative"
        face="round"
        name="check"
      />
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
import { AeIcon } from '@aeternity/aepp-components-3';
import Notification from './Notification.vue';
import ListItem from './ListItem.vue';
import AeButton from './AeButton.vue';
import prefixedAmount from '../filters/prefixedAmount';
import copyOnClick from '../directives/copyOnClick';

export default {
  components: {
    Notification,
    ListItem,
    AeIcon,
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

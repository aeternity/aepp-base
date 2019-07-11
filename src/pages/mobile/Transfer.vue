<template>
  <MobilePage
    class="transfer"
    header-fill="neutral"
    :right-button-icon-name="`${tooltipsVisible ? 'close' : 'question'}-circle`"
    :right-button-color="tooltipsVisible ? 'primary' : ''"
    @right-button-click="showTooltips"
  >
    <template slot="header">
      <Guide>
        <em>Send and receive</em>
        Æ
      </Guide>

      <AeAccount v-bind="activeAccount" />
    </template>

    <ListItem
      :to="{ name: 'send' }"
      title="Send"
      subtitle="Transfer funds"
      border-dark
    >
      <img
        slot="icon"
        :src="moneyWithWingsEmoji"
      >
      <LeftMore slot="right" />
    </ListItem>
    <ListItem
      :to="{ name: 'receive' }"
      title="Receive"
      subtitle="Share your address"
      border-dark
    >
      <img
        slot="icon"
        :src="manTippingHandEmoji"
      >
      <LeftMore slot="right" />
    </ListItem>
    <ListItem
      :to="{ name: 'transaction-list' }"
      title="Transactions"
      subtitle="Show transaction history"
      border-dark
    >
      <img
        slot="icon"
        :src="mantelpieceClockEmoji"
      >
      <LeftMore slot="right" />
    </ListItem>
    <ListItem
      title="Tokens in migration"
      subtitle="Not shown as balance above"
      border-dark
      @click="open({ name: 'migratedBalance' })"
    >
      <img
        slot="icon"
        :src="glowingStarEmoji"
      >
      <LeftMore slot="right" />
    </ListItem>
  </MobilePage>
</template>

<script>
import { pick } from 'lodash-es';
import { mapActions } from 'vuex';
import moneyWithWingsEmoji from 'emoji-datasource-apple/img/apple/64/1f4b8.png';
import manTippingHandEmoji from 'emoji-datasource-apple/img/apple/64/1f481-200d-2642-fe0f.png';
import mantelpieceClockEmoji from 'emoji-datasource-apple/img/apple/64/1f570-fe0f.png';
import glowingStarEmoji from 'emoji-datasource-apple/img/apple/64/1f31f.png';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeAccount from '../../components/AeAccount.vue';
import { LeftMore } from '../../components/icons';
import ListItem from '../../components/ListItem.vue';

export default {
  components: {
    MobilePage,
    Guide,
    AeAccount,
    ListItem,
    LeftMore,
  },
  data: () => ({
    moneyWithWingsEmoji,
    manTippingHandEmoji,
    mantelpieceClockEmoji,
    glowingStarEmoji,
    tooltipsVisible: false,
  }),
  subscriptions() {
    return pick(this.$store.state.observables, ['activeAccount']);
  },
  methods: {
    ...mapActions('modals', ['open']),
    async showTooltips() {
      this.tooltipsVisible = true;
      await this.open({
        name: 'showTooltips',
        tooltips: [{
          selector: '.transfer .ae-account .ae-identicon',
          header: 'Identicon',
          content: 'Recognize which account is active. Accounts & subaccounts have unique identicons.',
        }, {
          selector: '.transfer .tab-bar .button-plain',
          header: 'æpps',
          content: 'Explore æpps powered by the æternity blockchain.',
        }, {
          selector: '.transfer .tab-bar .button-plain:nth-child(3)',
          header: 'Account Switcher',
          content: 'Tap to switch accounts or create subaccounts.',
        }],
      });
      this.tooltipsVisible = false;
    },
  },
};
</script>

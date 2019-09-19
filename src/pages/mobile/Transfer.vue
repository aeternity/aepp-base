<template>
  <MobilePage
    class="transfer"
    header-fill="neutral"
    :right-button-icon-name="`${tooltipsVisible ? 'close' : 'question'}-circle`"
    :right-button-color="tooltipsVisible ? 'primary' : ''"
    @right-button-click="showTooltips"
  >
    <template slot="header">
      <Guide :template=" $t('transfer.guide')" />

      <AeAccount v-bind="activeAccount" />
    </template>

    <ListItem
      :to="{ name: 'send' }"
      :title="$t('transfer.send.title')"
      :subtitle="$t('transfer.send.subtitle')"
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
      :title="$t('transfer.receive.title')"
      :subtitle="$t('transfer.receive.subtitle')"
      border-dark
    >
      <img
        slot="icon"
        :src="manTippingHandEmoji"
      >
      <LeftMore slot="right" />
    </ListItem>
    <ListItem
      v-if="!$globals.DISABLED_BROWSER"
      :to="{ name: 'transaction-list' }"
      :title="$t('transfer.transaction.title')"
      :subtitle="$t('transfer.transaction.subtitle')"
      border-dark
    >
      <img
        slot="icon"
        :src="mantelpieceClockEmoji"
      >
      <LeftMore slot="right" />
    </ListItem>
    <ListItem
      :title="$t('transfer.migrated-balance.title')"
      :subtitle="$t('transfer.migrated-balance.subtitle')"
      border-dark
      @click="open({ name: 'migratedBalance' })"
    >
      <img
        slot="icon"
        :src="glowingStarEmoji"
      >
      <LeftMore slot="right" />
    </ListItem>
    <ListItem
      :to="{ name: 'redeem' }"
      :title="$t('transfer.redeem-balance.title')"
      :subtitle="$t('transfer.redeem-balance.subtitle')"
      border-dark
    >
      <img
        slot="icon"
        :src="mobilePhoneWithAnArrowEmoji"
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
import mobilePhoneWithAnArrowEmoji from 'emoji-datasource-apple/img/apple/64/1f4f2.png';
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
    mobilePhoneWithAnArrowEmoji,
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
          ...this.$t('transfer.tooltips.identicon'),
        }, ...!process.env.DISABLED_BROWSER ? [{
          selector: '.transfer .tab-bar .button-plain',
          ...this.$t('transfer.tooltips.browser'),
        }] : [], {
          selector: '.transfer .tab-bar .button-plain:nth-child(3)',
          ...this.$t('transfer.tooltips.account-switcher'),
        }],
      });
      this.tooltipsVisible = false;
    },
  },
};
</script>

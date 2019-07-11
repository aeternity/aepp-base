<template>
  <MobilePage
    class="transfer"
    header-fill="neutral"
    :right-button-icon-name="`${showTooltips ? 'close' : 'question'}-circle`"
    :right-button-color="showTooltips ? 'primary' : ''"
    @right-button-click="toggleTooltips"
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

    <Overlay
      v-if="showTooltips"
      @click="toggleTooltips"
    >
      <Tooltip
        v-if="$el"
        :anchor="$el.querySelector('.ae-identicon')"
        origin="bottom"
      >
        <Guide
          fill="neutral"
          size="small"
        >
          <em>Identicon</em>
          <br>Recognize which account is active. Accounts & subaccounts have unique identicons.
        </Guide>
      </Tooltip>
      <Tooltip>
        <Guide
          fill="neutral"
          size="small"
        >
          <em>Learn how to use the Base æpp</em>
          <br>Tap on any <span>highlighted region</span> to learn more about its functionality.
        </Guide>
      </Tooltip>
      <Tooltip
        v-if="$el"
        :anchor="$el.querySelector('.wrapper .ae-link')"
        origin="top"
      >
        <Guide
          fill="neutral"
          size="small"
        >
          <em>æpps</em>
          <br>Explore æpps powered by the æternity blockchain.
        </Guide>
      </Tooltip>
      <Tooltip
        v-if="$el"
        :anchor="$el.querySelector('.button-plain .ae-identicon')"
        origin="top"
      >
        <Guide
          fill="neutral"
          size="small"
        >
          <em>Account Switcher</em>
          <br>Tap to switch accounts or create subaccounts.
        </Guide>
      </Tooltip>
    </Overlay>
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
import Overlay from '../../components/Overlay.vue';
import Tooltip from '../../components/Tooltip.vue';

export default {
  components: {
    MobilePage,
    Guide,
    AeAccount,
    ListItem,
    LeftMore,
    Overlay,
    Tooltip,
  },
  data: () => ({
    moneyWithWingsEmoji,
    manTippingHandEmoji,
    mantelpieceClockEmoji,
    glowingStarEmoji,
    showTooltips: false,
  }),
  subscriptions() {
    return pick(this.$store.state.observables, ['activeAccount']);
  },
  methods: {
    ...mapActions('modals', ['open']),
    toggleTooltips() {
      this.showTooltips = !this.showTooltips;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables/colors.scss';
@import '../../styles/globals/functions.scss';

.mobile-page {
  .overlay {
    position: absolute;
    padding: 0;
    background-color: transparent;
    z-index: 1;
  }

  .guide span {
    border: rem(1px) solid rgba($color-primary, 0.3);
    background-color: rgba($color-primary, 0.2);
  }
}
</style>

<template>
  <MobilePage
    class="transfer"
    header-fill="neutral"
  >
    <template slot="header">
      <Guide>
        <em>Send and receive</em>
        <br>æternity tokens
      </Guide>

      <Menu
        :anchor="showAccountMenu ? $refs.accountButton : null"
        :anchor-origin="{ vertical: 'top', horizontal: 'right' }"
        :transform-origin="{ vertical: 'top', horizontal: 'right' }"
        @close="showAccountMenu = false"
      >
        <MenuItem v-copy-on-click="activeIdentity.address">
          <AeIcon name="copy" />Copy Address
        </MenuItem>
        <MenuItem @click="accountNameEditable = true">
          <AeIcon name="edit" />Rename
        </MenuItem>
      </Menu>

      <AeAccount
        v-bind="activeIdentity"
        :name-editable="accountNameEditable"
        fill="primary"
        security-status=""
        @name-input="name => renameIdentity(name)"
        @name-blur="accountNameEditable = false"
      >
        <ButtonPlain
          slot="icon"
          ref="accountButton"
          @click="showAccountMenu = true"
        >
          <AeIcon
            fill="white"
            name="more"
          />
        </ButtonPlain>
      </AeAccount>
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
      <AeIcon
        slot="right"
        name="left-more"
      />
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
      <AeIcon
        slot="right"
        name="left-more"
      />
    </ListItem>
    <ListItem
      title="Tokens in migration"
      subtitle="Available after next hardfork"
      border-dark
      @click="showMigratedBalanceModal = true"
    >
      <img
        slot="icon"
        :src="glowingStarEmoji"
      >
      <AeIcon
        slot="right"
        name="left-more"
      />
    </ListItem>

    <TransferNotification
      v-if="showTransferNotification"
      :amount="BigNumber(amount)"
      :transaction-hash="transactionHash"
    />

    <MigratedBalanceModal
      v-if="showMigratedBalanceModal"
      @close="showMigratedBalanceModal = false"
    />
  </MobilePage>
</template>

<script>
import BigNumber from 'bignumber.js';
import { mapGetters } from 'vuex';
import { AeIcon } from '@aeternity/aepp-components-3';
import moneyWithWingsEmojiPath from 'emoji-datasource-apple/img/apple/64/1f4b8.png';
import manTippingHandEmojiPath from 'emoji-datasource-apple/img/apple/64/1f481-200d-2642-fe0f.png';
import glowingStarEmojiPath from 'emoji-datasource-apple/img/apple/64/1f31f.png';
import copyOnClick from '../../directives/copyOnClick';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeAccount from '../../components/AeAccount.vue';
import ButtonPlain from '../../components/ButtonPlain.vue';
import Menu from '../../components/Menu.vue';
import MenuItem from '../../components/MenuItem.vue';
import ListItem from '../../components/ListItem.vue';
import TransferNotification from '../../components/TransferNotification.vue';
import MigratedBalanceModal from '../../components/mobile/MigratedBalanceModal.vue';

export default {
  components: {
    MobilePage,
    Guide,
    AeAccount,
    ButtonPlain,
    Menu,
    MenuItem,
    AeIcon,
    ListItem,
    TransferNotification,
    MigratedBalanceModal,
  },
  directives: { copyOnClick },
  props: {
    amount: {
      type: String,
      default: '',
    },
    transactionHash: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      moneyWithWingsEmoji: moneyWithWingsEmojiPath,
      manTippingHandEmoji: manTippingHandEmojiPath,
      glowingStarEmoji: glowingStarEmojiPath,
      showAccountMenu: false,
      accountNameEditable: false,
      showMigratedBalanceModal: false,
      BigNumber,
      showTransferNotification: !!this.transactionHash,
    };
  },
  computed: mapGetters(['activeIdentity']),
  mounted() {
    if (this.showTransferNotification) {
      setTimeout(() => { this.showTransferNotification = false; }, 5000);
    }
  },
  methods: {
    renameIdentity(name) {
      this.$store.commit('renameIdentity', { index: this.$store.state.selectedIdentityIdx, name });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.transfer {
  .list-item .ae-icon {
    font-size: rem(20px);
  }
}
</style>

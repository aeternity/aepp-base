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

      <AeAccount
        v-bind="activeIdentity"
        :name-editable="accountNameEditable"
        fill="primary"
        security-status=""
        @name-input="name => renameIdentity(name)"
        @name-blur="accountNameEditable = false"
      >
        <AeDropdown slot="icon">
          <AeIcon
            slot="button"
            fill="white"
            name="more"
          />
          <li>
            <AeButton @click="copyAddress">
              <AeIcon name="copy" />
              Copy Address
            </AeButton>
          </li>
          <li>
            <AeButton @click="accountNameEditable = true">
              <AeIcon name="edit" />
              Rename
            </AeButton>
          </li>
        </AeDropdown>
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
import { AeIcon, AeDropdown, AeButton } from '@aeternity/aepp-components-3';
import moneyWithWingsEmojiPath from 'emoji-datasource-apple/img/apple/64/1f4b8.png';
import manTippingHandEmojiPath from 'emoji-datasource-apple/img/apple/64/1f481-200d-2642-fe0f.png';
import glowingStarEmojiPath from 'emoji-datasource-apple/img/apple/64/1f31f.png';
import copy from 'clipboard-copy';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeAccount from '../../components/AeAccount.vue';
import ListItem from '../../components/ListItem.vue';
import TransferNotification from '../../components/TransferNotification.vue';
import MigratedBalanceModal from '../../components/mobile/MigratedBalanceModal.vue';

export default {
  components: {
    MobilePage,
    Guide,
    AeAccount,
    AeDropdown,
    AeButton,
    AeIcon,
    ListItem,
    TransferNotification,
    MigratedBalanceModal,
  },
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
    copyAddress() {
      copy(this.activeIdentity.address);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.transfer {
  .ae-dropdown /deep/ .ae-dropdown-button {
    width: rem(20px);
    height: rem(20px);
  }

  .list-item .ae-icon {
    font-size: rem(20px);
  }
}
</style>

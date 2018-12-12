<template>
  <mobile-page
    class="receive"
    fill="neutral"
  >
    <guide
      fill="primary"
    >
      <em>Send and receive</em>
      <br>æternity tokens
    </guide>

    <ae-account
      v-bind="activeIdentity"
      :name-editable="accountNameEditable"
      fill="primary"
      security-status=""
      @name-input="name => renameIdentity(name)"
      @name-blur="accountNameEditable = false"
    >
      <ae-dropdown slot="icon">
        <ae-icon
          slot="button"
          fill="white"
          name="more"
        />
        <li>
          <ae-button
            plain
            @click="copyAddress"
          >
            <ae-icon name="copy" />
            Copy Address
          </ae-button>
        </li>
        <li>
          <ae-button
            plain
            @click="accountNameEditable = true"
          >
            <ae-icon name="edit" />
            Rename
          </ae-button>
        </li>
      </ae-dropdown>
    </ae-account>

    <template slot="content-bottom">
      <list-item :to="{ name: 'send' }">
        <img :src="moneyWithWingsEmoji">
        <div class="content">
          <div class="title">Send</div>
          <div class="subtitle">Transfer funds</div>
        </div>
        <ae-icon
          slot="right"
          name="left-more"
        />
      </list-item>
      <list-item :to="{ name: 'receive' }">
        <img :src="manTippingHandEmoji">
        <div class="content">
          <div class="title">Receive</div>
          <div class="subtitle">Share your address</div>
        </div>
        <ae-icon
          slot="right"
          name="left-more"
        />
      </list-item>
      <list-item @click="showMigratedBalanceModal = true">
        <img :src="glowingStarEmoji">
        <div class="content">
          <div class="title">Tokens to be migrated</div>
          <div class="subtitle">To this address (not shown in card)</div>
        </div>
        <ae-icon
          slot="right"
          name="left-more"
        />
      </list-item>
    </template>

    <migrated-balance-modal
      v-if="showMigratedBalanceModal"
      @click="showMigratedBalanceModal = false"
    />

    <transfer-notification
      v-if="showTransferNotification"
      :amount="$route.params.amount"
      :tx="$route.params.tx"
    />
  </mobile-page>
</template>

<script>
import BigNumber from 'bignumber.js';
import { mapGetters, mapMutations } from 'vuex';
import { AeIcon, AeDropdown } from '@aeternity/aepp-components-3';
import moneyWithWingsEmojiPath from 'emoji-datasource-apple/img/apple/64/1f4b8.png';
import manTippingHandEmojiPath from 'emoji-datasource-apple/img/apple/64/1f481-200d-2642-fe0f.png';
import glowingStarEmojiPath from 'emoji-datasource-apple/img/apple/64/1f31f.png';
import copy from 'clipboard-copy';
import { setTimeout } from 'timers';
import MobilePage from '../components/MobilePage.vue';
import Guide from '../components/Guide.vue';
import AeAccount from '../components/AeAccount.vue';
import AeButton from '../components/AeButton.vue';
import ListItem from '../components/ListItem.vue';
import MigratedBalanceModal from '../components/MigratedBalanceModal.vue';
import TransferNotification from '../components/TransferNotification.vue';

export default {
  components: {
    MobilePage,
    Guide,
    AeAccount,
    AeDropdown,
    AeButton,
    AeIcon,
    ListItem,
    MigratedBalanceModal,
    TransferNotification,
  },
  data() {
    return {
      moneyWithWingsEmoji: moneyWithWingsEmojiPath,
      manTippingHandEmoji: manTippingHandEmojiPath,
      glowingStarEmoji: glowingStarEmojiPath,
      accountNameEditable: false,
      showMigratedBalanceModal: false,
      BigNumber,
      showTransferNotification: !!this.$route.params.tx,
    };
  },
  computed: mapGetters(['activeIdentity']),
  mounted() {
    if (this.showTransferNotification) {
      setTimeout(() => { this.showTransferNotification = false; }, 5000);
    }
  },
  methods: {
    ...mapMutations(['renameIdentity']),
    copyAddress() {
      copy(this.activeIdentity.address);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.receive {
  /deep/ {
    .panel .bottom {
      padding-top: rem(40px);
    }

    .ae-dropdown {
      .ae-icon {
        font-size: rem(20px);
      }

      .ae-dropdown-button {
        width: rem(20px);
        height: rem(20px);
      }

      li {
        padding: 0;

        .ae-button {
          display: flex;
          @extend %face-sans-s;
          text-transform: none;
          letter-spacing: 0;
        }
      }
    }
  }

  .guide {
    margin-left: rem(20px);
  }

  .list-item {
    padding: rem(8px);
    border-bottom: solid $color-neutral-positive-1;
    border-width: 2px 0;

    img {
      margin: 0 rem(9px) rem(4px) 0;
      width: rem(33px);
    }

    .content {
      .title {
        @extend %face-sans-s;
        font-weight: 500;
        color: $color-neutral-negative-3;
      }

      .subtitle {
        @extend %face-sans-xs;
        color: $color-neutral-negative-1;
      }
    }

    &:last-child {
      border: none;
    }
  }
}
</style>

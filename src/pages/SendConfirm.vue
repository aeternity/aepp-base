<template>
  <mobile-page
    class="send-confirm"
    fill="primary"
  >
    <guide
      fill="neutral"
      icon="³⁄₃"
    >
      <em>Complete your transfer</em>
      <br>from
      <ae-identicon
        :address="activeIdentity.address"
        size="s"
      /><em>{{ activeIdentity.name }}</em>
      <br>to
      <ae-identicon
        :address="to"
        size="s"
      />
      <em>
        <span class="address">
          {{ formattedAddress }}
        </span>
      </em>
    </guide>

    <list-item inactive>
      <span class="title">
        Amount
      </span>
      <span
        slot="right"
        class="content"
      >
        {{ BigNumber(amount) | prefixedAmount }} AE
      </span>
    </list-item>
    <list-item
      class="list-bottom"
      inactive
    >
      <span class="title">
        <img src="../assets/icons/turtle.svg">
      </span>
      <span
        slot="right"
        class="content"
      >
        <img src="../assets/icons/rabbit.svg">
      </span>
    </list-item>
    <list-item
      class="list-border-bottom"
      inactive
    >
      <range
        v-model="fee"
        :min="MIN_SPEND_TX_FEE"
        :max="MAX_REASONABLE_FEE"
      />
    </list-item>
    <list-item
      class="list-border-bottom"
      inactive
    >
      <div class="title">
        Gas Price
      </div>
      <span
        slot="right"
        class="content"
      >
        {{ formattedFee | prefixedAmount }} AE
      </span>
    </list-item>
    <list-item
      class="list-border"
      inactive
    >
      <div class="title">
        Transaction speed
      </div>
      <span
        slot="right"
        class="content"
      >
        {{ transactionSpeed }}
      </span>
    </list-item>
    <list-item
      inactive
      class="account"
    >
      <div class="title">
        Recipient Account Key
      </div>
      <div class="subtitle">
        <ae-address :value="to" />
      </div>
    </list-item>

    <ae-button-group slot="footer">
      <ae-button
        :to="{ name: 'transfer' }"
        uppercase
      >
        Cancel
      </ae-button>
      <ae-button
        fill="secondary"
        uppercase
        @click="send"
      >
        Confirm
      </ae-button>
    </ae-button-group>
  </mobile-page>
</template>

<script>
import BigNumber from 'bignumber.js';
import { mapGetters, mapState } from 'vuex';
import { AeIdenticon, AeButtonGroup, AeAddress } from '@aeternity/aepp-components-3';
import MobilePage from '../components/MobilePage.vue';
import Guide from '../components/Guide.vue';
import ListItem from '../components/deprecated/ListItem.vue';
import Range from '../components/Range.vue';
import AeButton from '../components/AeButton.vue';
import { MAGNITUDE, MIN_SPEND_TX_FEE, MAX_REASONABLE_FEE } from '../lib/constants';
import prefixedAmount from '../filters/prefixedAmount';

export default {
  components: {
    MobilePage,
    Guide,
    AeIdenticon,
    ListItem,
    Range,
    AeButton,
    AeButtonGroup,
    AeAddress,
  },
  filters: { prefixedAmount },
  props: {
    to: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    MIN_SPEND_TX_FEE,
    MAX_REASONABLE_FEE,
    fee: MIN_SPEND_TX_FEE,
    BigNumber,
    transactionSpeed: '< 2 min',
  }),
  computed: {
    ...mapGetters(['activeIdentity']),
    ...mapState(['epoch']),
    formattedAddress() {
      const address = this.to;
      return `${address.substr(0, 3)} ${address.substr(3, 2)}···${address.slice(-3)}`;
    },
    formattedFee() {
      return BigNumber(this.fee).shiftedBy(-MAGNITUDE);
    },
  },
  methods: {
    async send() {
      if (!await this.$validator.validateAll()) return;

      const signedTx = await this.$store.dispatch('signTransaction', {
        transaction: {
          fee: BigNumber(this.fee).shiftedBy(-MAGNITUDE),
          amount: BigNumber(this.amount),
          senderId: this.activeIdentity.address,
          recipientId: this.to,
          payload: '',
          ttl: Number.MAX_SAFE_INTEGER,
        },
        appName: 'Transfer',
        acceptImmediately: true,
      });
      const { txHash } = await this.epoch.api.postTransaction({ tx: signedTx });

      this.$router.push({ name: 'transfer', params: { transactionHash: txHash, amount: this.amount } });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.send-confirm {
  background: $color-primary;

  .guide {
    margin: 0 0 rem(30px) rem(20px);

    .ae-identicon {
      margin: 0 rem(2px) rem(-4px) rem(2px);
    }

    .address {
      @extend %face-mono-base;
      font-size: rem(23px);
    }
  }

  .list-item {
    margin: 0 rem(20px);
    padding: 0;
    border: none;
    border-top: rem(2px) solid $color-primary-negative-1;

    &.list-bottom,
    &.list-border-bottom,
    &.list-border {
      height: rem(28px);
    }

    &.list-bottom {
      padding-top: rem(20px);
    }

    &.list-border-bottom, &.list-border {
      border: none;
    }

    &.list-border {
      padding-bottom: rem(20px);
    }

    &.account {
      display: block;
      margin-bottom: rem(20px);
      padding: rem(20px) 0;

      .title {
        margin-bottom: rem(10px);
      }
    }

    .title {
      @extend %face-sans-xs;
      font-weight: 500;
      color: $color-primary-positive-3;
    }

    .subtitle {
      .ae-address {
        grid-template-columns: repeat(6, 1fr);
        grid-column-gap: rem(19px);
        font-weight: normal;
        color: $color-neutral-maximum;
      }
    }

    .content {
      @extend %face-mono-xs;
      font-weight: 400;
      color: $color-neutral-maximum;
    }
  }
}
</style>

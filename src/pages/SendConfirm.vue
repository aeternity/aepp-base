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
        <ae-address
          :address="to"
          length="short"
        />
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
      <div class="title">
        Transaction fee
      </div>
      <span
        slot="right"
        class="content"
      >
        {{ formattedFee | prefixedAmount }} AE
      </span>
    </list-item>

    <list-item
      class="list-border-bottom"
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
      class="list-border"
      inactive
    >
      <ae-input-range
        v-model="fee"
        fill="light"
        :min="MIN_SPEND_TX_FEE"
        :max="MAX_REASONABLE_FEE"
      />
    </list-item>

    <list-item
      inactive
      class="account"
    >
      <div class="title">
        Recipient Account
      </div>
      <div class="subtitle">
        <ae-address
          :address="to"
          split-by="6"
        />
      </div>
    </list-item>

    <ae-button-group slot="footer">
      <ae-button
        fill="light"
        :to="{ name: 'transfer' }"
      >
        Cancel
      </ae-button>
      <ae-button
        fill="secondary"
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
import { AeIdenticon, AeButtonGroup } from '@aeternity/aepp-components-3';
import MobilePage from '../components/MobilePage.vue';
import Guide from '../components/Guide.vue';
import ListItem from '../components/deprecated/ListItem.vue';
import AeInputRange from '../components/AeInputRange.vue';
import AeButton from '../components/AeButton.vue';
import AeAddress from '../components/AeAddress.vue';
import { MAGNITUDE, MIN_SPEND_TX_FEE, MAX_REASONABLE_FEE } from '../lib/constants';
import prefixedAmount from '../filters/prefixedAmount';

export default {
  components: {
    MobilePage,
    Guide,
    AeIdenticon,
    ListItem,
    AeInputRange,
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
  }),
  computed: {
    ...mapGetters(['activeIdentity']),
    ...mapState(['epoch']),
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

.send-confirm.mobile-page {
  .guide {
    .ae-identicon {
      margin: 0 rem(6px) rem(-4px) rem(2px);
    }

    .ae-address {
      font-size: rem(23px);
    }
  }

  .list-item {
    margin: 0;
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
      padding-bottom: rem(10px);

      .content {
        text-transform: uppercase;
      }
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
        font-weight: normal;
        color: $color-neutral-maximum;
        letter-spacing: rem(1.5px);
      }
    }

    .content {
      @extend %face-mono-xs;
      font-weight: 400;
      color: $color-neutral-maximum;
    }
  }

  .ae-button-group .ae-button {
    min-width: 0;
    border-radius: 0;
    margin: 0;
  }
}
</style>

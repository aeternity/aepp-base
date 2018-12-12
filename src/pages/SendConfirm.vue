<template>
  <mobile-page
    class="send-confirm"
    fill="primary"
  >
    <guide
      fill="neutral"
      icon="³⁄₃"
    >
      <em>Review your transfer</em>
      <br>from
      <ae-identicon
        :address="activeIdentity.address"
        size="s"
      /><em>{{ activeIdentity.name }}</em>
      <br>to
      <ae-identicon
        :address="$route.params.to"
        size="s"
      />
      <em><span class="address">{{ formattedAddress }}</span></em>
    </guide>

    <list-item inactive>
      <span class="title">Amount</span>
      <span
        slot="right"
        class="content"
      >{{ $route.params.amount }} AE</span>
    </list-item>
    <list-item inactive>
      <span class="title"><img src="../assets/icons/turtle.svg"></span>
      <span
        slot="right"
        class="content"
      ><img src="../assets/icons/rabbit.svg"></span>
    </list-item>
    <list-item inactive>
      <input
        :min="MIN_SPEND_TX_FEE"
        :max="MAX_REASONABLE_FEE"
        v-model="fee"
        type="range"
      >
    </list-item>
    <list-item inactive>
      <div class="title">Gas Price</div>
      <span
        slot="right"
        class="content"
      >{{ formattedFee.toString() }} AE</span>
    </list-item>
    <list-item inactive>
      <div class="title">Transaction speed</div>
      <span
        slot="right"
        class="content"
      >{{ transactionSpeed }}</span>
    </list-item>
    <list-item
      inactive
      class="account"
    >
      <div class="title">Recipient Account Key</div>
      <div class="subtitle">
        <ae-address :value="$route.params.to" />
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
import { AeIdenticon, AeAddress } from '@aeternity/aepp-components-3';
import AeButtonGroup from '@aeternity/aepp-components-3/src/components/ae-button-group/ae-button-group.vue';
import MobilePage from '../components/MobilePage.vue';
import Guide from '../components/Guide.vue';
import ListItem from '../components/ListItem.vue';
import AeButton from '../components/AeButton.vue';
import { MAGNITUDE, MIN_SPEND_TX_FEE, MAX_REASONABLE_FEE } from '../lib/constants';

export default {
  components: {
    MobilePage,
    Guide,
    AeIdenticon,
    ListItem,
    AeButton,
    AeButtonGroup,
    AeAddress,
  },
  data: () => ({
    amount: '',
    MAGNITUDE,
    MIN_SPEND_TX_FEE,
    MAX_REASONABLE_FEE,
    fee: MIN_SPEND_TX_FEE.toFixed(),
    BigNumber,
    transactionSpeed: '< 2 min',
  }),
  computed: {
    ...mapGetters(['activeIdentity']),
    ...mapState(['epoch']),
    formattedAddress() {
      const address = this.$route.params.to;
      return `${address.substr(0, 3)} ${address.substr(3, 2)}···${address.slice(-3)}`;
    },
    formattedFee() {
      return BigNumber(this.fee).shiftedBy(-this.MAGNITUDE);
    },
  },
  methods: {
    async send() {
      if (!await this.$validator.validateAll()) return;

      const signedTx = await this.$store.dispatch('signTransaction', {
        transaction: {
          fee: BigNumber(this.fee).shiftedBy(-this.MAGNITUDE),
          amount: BigNumber(this.$route.params.amount),
          senderId: this.activeIdentity.address,
          recipientId: this.$route.params.to,
          payload: '',
          ttl: Number.MAX_SAFE_INTEGER,
        },
        appName: 'Transfer',
        acceptImmediately: true,
      });
      const { txHash } = await this.epoch.api.postTransaction({ tx: signedTx });

      this.$router.push({ name: 'transfer', params: { tx: txHash, amount: this.$route.params.amount } });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

@mixin range-track() {
  width: 100%;
  height: rem(2px);
  background: $color-primary-positive-1;
}

@mixin range-thumb() {
  height: 15px;
  width: 15px;
  border-radius: 48px;
  background: $color-neutral-maximum;
  cursor: pointer;
}

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

    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5),
    &:nth-child(6), {
      border: none;
      height: rem(28px);
    }

    &:nth-child(3) {
      border-top: rem(2px) solid $color-primary-negative-1;
    }

    &:nth-child(3) {
      padding-top: rem(20px);
    }

    &:nth-child(6) {
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
      background: transparent;
    }

    input[type=range] {
      -webkit-appearance: none;
      width: 100%;
      margin: -2.5px 0;
      cursor: pointer;

      &:focus {
        outline: none;
      }

      &::-webkit-slider-runnable-track {
        @include range-track;
      }

      &::-moz-range-track {
        @include range-track;
      }

      &::-ms-track {
        @include range-track;
      }

      &::-ms-fill-lower {
        @include range-track;
      }

      &::-ms-fill-upper {
        @include range-track;
      }

      &::-ms-track {
        background: transparent;
        border-color: transparent;
        color: transparent;
      }

      &::-webkit-slider-thumb {
        @include range-thumb;
      }

      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        margin-top: rem(-6px);
      }

      &::-moz-range-thumb {
        @include range-thumb;
      }
      &::-ms-thumb  {
        @include range-thumb;
      }
    }
  }
}
</style>

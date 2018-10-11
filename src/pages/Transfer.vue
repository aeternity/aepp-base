<template>
  <mobile-page
    class="transfer"
    title="Transfer">
    <ae-switch
      v-if="identitiesTo.length"
      v-model="transactionType"
      :default="swiperOptionsTo.initialSlide === -1 ? 'external' : 'internal'"
      :choices="[
        { value: 'internal', label: 'To own identity' },
        { value: 'external', label: 'External address' }
      ]"
    />

    <swiper
      v-if="transactionType === 'internal'"
      :options="swiperOptionsTo"
      class="swiper-container"
    >
      <swiper-slide
        v-for="i in identitiesTo"
        :key="i.address">
        <ae-identity
          :active="false"
          v-bind="i"
          :collapsed="false"
          size="big" />
      </swiper-slide>
      <div
        slot="pagination"
        class="swiper-pagination" />
    </swiper>
    <div v-else>
      <ae-label
        :for="`${_uid}-addressTo`"
        :help-text="errors.first('addressTo')"
        help-type="dramatic"
      >Receiving address</ae-label>
      <ae-address-input
        v-validate="'required|min:51|max:53'"
        :id="`${_uid}-addressTo`"
        v-model="to"
        name="addressTo"
        data-vv-delay="1"
        placeholder="ak$ ••• ••• ••• ••• ••• ••• ••• ••• ••• ••• ••• ••• ••• ••• ••• •••"
      />
      <div class="buttons">
        <ae-button
          :to="{
            name: 'address-book-choose',
            params: { redirectPathTemplate: `/transfer/{address}/${$route.params.amount || ''}` }
          }"
          type="exciting"
          size="small"
          uppercase
        >Contact</ae-button>
      </div>
    </div>

    <ae-label
      :for="`${_uid}-currency`"
      :help-text="errors.first('currency')"
      help-type="dramatic"
    >Amount</ae-label>
    <ae-amount-input
      v-validate:amount="`required|decimal|min_value_exclusive:0|max_value:${maxAmount}`"
      :id="`${_uid}-currency`"
      :value="{ amount, symbol: 'AE' }"
      :units="[{ symbol: 'AE', name: 'æternity' }]"
      name="currency"
      data-vv-delay="1"
      placeholder="0.00"
      @input="value => amount = value.amount"
    />
    <div class="fiat-amount">≈ {{ fiatAmount }} CHF</div>

    <ae-button
      :disabled="errors.any()"
      type="dramatic"
      @click="send"
    >
      <img
        slot="icon"
        :src="require('emoji-datasource-apple/img/apple/64/1f4b8.png')" >
      Make Transaction
    </ae-button>
  </mobile-page>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import {
  AeButton,
  AeSwitch,
  AeAddressInput,
  AeAmountInput,
  AeIdentity,
  AeLabel,
} from '@aeternity/aepp-components';
import { swiper as Swiper, swiperSlide as SwiperSlide } from 'vue-awesome-swiper';
import { convertAEtoCHF } from '../lib/currencyConverter';
import MobilePage from '../components/MobilePage.vue';

export default {
  components: {
    MobilePage,
    AeIdentity,
    AeButton,
    AeSwitch,
    AeAddressInput,
    AeAmountInput,
    AeLabel,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      transactionType: undefined,
      aePrice: undefined,
    };
  },
  computed: {
    ...mapGetters(['identities', 'activeIdentity']),
    ...mapState({
      epoch: ({ epoch }) => epoch,
      identitiesTo: (state, { identities, activeIdentity }) =>
        identities.filter(i => i.address !== activeIdentity.address),
      maxAmount: ({ balances }, { activeIdentity }) =>
        (activeIdentity ? balances[activeIdentity.address] : 0),
    }),
    to: {
      get() {
        return this.$route.params.to;
      },
      set(to) {
        this.$router.replace({
          name: 'transfer',
          params: {
            ...this.$route.params,
            to,
          },
        });
      },
    },
    amount: {
      get() {
        return this.$route.params.amount;
      },
      set(amount) {
        this.$router.replace({
          name: 'transfer',
          params: {
            ...this.$route.params,
            amount,
          },
        });
      },
    },
    fiatAmount() {
      const fiatAmount = this.aePrice * +this.amount;
      return Number.isNaN(fiatAmount) ? 'N/A' : fiatAmount.toFixed(2);
    },
    swiperOptionsTo() {
      const transfer = this;
      function syncTo() {
        transfer.to = transfer.identitiesTo[this.activeIndex].address;
      }
      return {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        initialSlide: this.identitiesTo.findIndex(i => i.address === this.to),
        on: {
          init: syncTo,
          slideChange: syncTo,
        },
      };
    },
  },
  async mounted() {
    this.$store.dispatch('updateAllBalances');
    this.aePrice = await convertAEtoCHF();
  },
  methods: {
    async send() {
      if (!await this.$validator.validateAll()) return;

      const { to, amount } = this;
      if (!to || !amount) return;

      const signedTx = await this.$store.dispatch('signTransaction', {
        transaction: {
          fee: 1,
          amount: Math.floor(amount),
          senderId: this.activeIdentity.address,
          recipientId: to,
          payload: '',
          ttl: Number.MAX_SAFE_INTEGER,
        },
        appName: 'Transfer',
      });
      await this.epoch.api.postTransaction({ tx: signedTx });
    },
  },
};
</script>

<style lang="css" src="swiper/dist/css/swiper.css" />
<style lang="scss" src="../components/MobilePageContent.scss" scoped />
<style lang="scss" scoped>
@import '~@aeternity/aepp-components/dist/variables.scss';

.transfer.mobile-page {
  .swiper-container /deep/ {
    z-index: auto;

    .swiper-wrapper {
      z-index: auto;
      padding-bottom: 35px;
    }

    .swiper-pagination {
      z-index: auto;

      &-bullet {
        background: $aubergine;
      }
    }
  }

  .ae-switch {
    margin-bottom: 35px;
    text-transform: uppercase;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: -15px;
    margin-bottom: 15px;

    .ae-button {
      min-width: 25%;
    }
  }

  .fiat-amount {
    color: $grey;
    text-align: center;
    font-size: 12px;
    line-height: 16px;
    font-weight: 500;
    margin-top: -20px;
    margin-bottom: 20px;
    text-transform: uppercase;
  }
}
</style>

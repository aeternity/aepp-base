<template>
  <MobilePage
    class="auction-bid"
    :header-fill="activeColor"
    right-button-icon-name="close"
    :right-button-to="name ? { name: 'auction-details', params: { name } } : { name: 'name-list' }"
    v-bind="amountStep && {
      leftButtonIconName: 'back',
      leftButtonTo: backTo,
    }"
  >
    <template slot="header">
      <Guide
        :template="$t('name.bid.guide')"
        fill="neutral"
      >
        <template slot="name">
          {{ internalName }}
        </template>
      </Guide>

      <form
        :id="_uid"
        @submit.prevent="handleSubmit"
      >
        <AeInput
          v-if="!amountStep"
          v-model="internalName"
          v-validate="'required|aens_name|aens_name_unregistered'"
          autofocus
          autocomplete="off"
          :error="errors.has('name')"
          :footer="errors.first('name')"
          name="name"
          :header="$t('name.new.name')"
          :placeholder="$t('name.new.name-placeholder')"
          maxlength="16"
        />
        <AeInputAmountCurrency
          v-else
          v-model="amount"
          v-validate="{
            required: true,
            decimal: MAGNITUDE,
            min_value_exclusive: highestBid ? highestBid.toString() : 0,
          }"
          :error="errors.has('amount')"
          :footer="errors.first('amount') || ' '"
          autofocus
          name="amount"
        />
      </form>
    </template>

    <DetailsAmountCurrency
      v-if="highestBid"
      short
      :name="$t('name.bid.highest-bid')"
      :amount="highestBid"
    />

    <DetailsField
      v-if="expiration && topBlockHeight"
      :name="$t('name.bid.remaining-time')"
      :value="$tc('blocks', expiration - topBlockHeight)"
    />

    <AeButton
      fill="secondary"
      :form="_uid"
      :disabled="errors.has('name') || !expiration || busy"
    >
      {{ $t('next') }}
    </AeButton>
  </MobilePage>
</template>

<script>
import { pick } from 'lodash-es';
import BigNumber from 'bignumber.js';
import { mapGetters } from 'vuex';
import { MAGNITUDE } from '../../lib/constants';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeInput from '../../components/AeInput.vue';
import AeInputAmountCurrency from '../../components/AeInputAmountCurrency.vue';
import DetailsAmountCurrency from '../../components/mobile/DetailsAmountCurrency.vue';
import DetailsField from '../../components/mobile/DetailsField.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: {
    MobilePage,
    Guide,
    AeInput,
    AeInputAmountCurrency,
    DetailsAmountCurrency,
    DetailsField,
    AeButton,
  },
  props: {
    name: { type: String, default: '' },
    amountStep: Boolean,
  },
  data() {
    return {
      busy: false,
      internalName: this.name,
      highestBid: null,
      expiration: 0,
      amount: '',
      MAGNITUDE,
    };
  },
  computed: {
    ...mapGetters('accounts', ['activeColor']),
    backTo() {
      if (!this.name && !this.expiration) return { name: 'name-list' };
      return {
        name: 'auction-bid',
        params: { name: this.expiration ? this.internalName : this.name },
      };
    },
  },
  subscriptions() {
    return pick(this.$store.state.observables, ['topBlockHeight']);
  },
  mounted() {
    let promise;
    this.$watch(
      ({ internalName }) => internalName,
      (name) => {
        if (promise) promise.cancel();
        promise = (async () => {
          this.expiration = 0;
          this.highestBid = null;
          const res = await this.$store.dispatch('names/fetchAuctionEntry', name);
          this.expiration = res.expiration;
          this.highestBid = res.bids
            .map(({ nameFee }) => nameFee)
            .reduce((a, b) => (a.isGreaterThan(b) ? a : b));
        })();
      },
      { immediate: true },
    );
  },
  methods: {
    async handleSubmit() {
      if (!await this.$validator.validateAll()) return;
      const name = this.internalName;
      if (!this.amountStep) {
        this.$router.push({ name: 'auction-bid-amount', params: { name } });
        return;
      }
      this.busy = true;
      try {
        await this.$store.state.sdk.aensBid(
          name, BigNumber(this.amount).shiftedBy(MAGNITUDE),
        );
        this.$router.push({ name: 'auction-details', params: { name } });
      } finally {
        this.busy = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.auction-bid .details-item {
  --color-primary: #{$color-neutral-negative-1};
  --color-secondary: #{$color-neutral-negative-1};

  &:first-child {
    border-top: none;
    padding-top: 0;
  }
}
</style>

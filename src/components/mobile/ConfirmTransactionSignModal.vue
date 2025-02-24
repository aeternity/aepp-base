<template>
  <Page
    :modal="!$globals.ENV_MOBILE_DEVICE"
    fill="primary"
    hide-tab-bar
    right-button-icon-name="close"
    @right-button-click="denyHandler"
  >
    <Guide :template="guideTemplate" fill="neutral">
      <AeFraction v-if="stepFraction" slot="icon" v-bind="stepFraction" />
      <AccountInline slot="senderAddress" :address="account.address" />
      <AccountInline slot="recipientAddress" :address="transaction.recipientId" />
    </Guide>

    <DetailsAmountCurrency v-if="transaction.amount" :amount="transaction.amount" />

    <DetailsFeeInput v-model="newFee" :min="transaction.minFee" :max="maxFee" />

    <DetailsList :object="transaction" :field-renderers="fieldRenderers" />

    <AeButtonGroup slot="footer">
      <AeButton fill="light" @click="denyHandler">
        {{ $t('cancel') }}
      </AeButton>
      <AeButton fill="secondary" @click="allowHandler">
        {{ $t('confirm') }}
      </AeButton>
    </AeButtonGroup>
  </Page>
</template>

<script>
import { mapState } from 'vuex';
import { Tag, isAuctionName } from '@aeternity/aepp-sdk';
import Page from '../Page.vue';
import Guide from '../Guide.vue';
import AeFraction from '../AeFraction.vue';
import AccountInline from '../AccountInline.vue';
import DetailsAmountCurrency from './DetailsAmountCurrency.vue';
import DetailsFeeInput from './DetailsFeeInput.vue';
import DetailsList from './DetailsList.vue';
import {
  Payload,
  RecipientId,
  Code,
  CallData,
  ContractId,
  CommitmentId,
  Name,
  NameSalt,
  NameId,
  NameFee,
} from './details-fields';
import DetailsNamePointers from './DetailsNamePointers.vue';
import AeButtonGroup from '../AeButtonGroup.vue';
import AeButton from '../AeButton.vue';

export default {
  components: {
    Page,
    Guide,
    AeFraction,
    AccountInline,
    DetailsAmountCurrency,
    DetailsFeeInput,
    DetailsList,
    AeButtonGroup,
    AeButton,
  },
  props: {
    transaction: { type: Object, required: true },
    resolve: { type: Function, required: true },
    reject: { type: Function, required: true },
  },
  data() {
    return {
      newFee: this.transaction.fee,
      fieldRenderers: {
        payload: Payload,
        recipientId: RecipientId,
        code: Code,
        callData: CallData,
        contractId: ContractId,
        commitmentId: CommitmentId,
        name: Name,
        nameFee: NameFee,
        nameSalt: NameSalt,
        nameId: NameId,
        pointers: DetailsNamePointers,
      },
    };
  },
  subscriptions() {
    return { account: this.$store.state.observables.activeAccount };
  },
  computed: {
    ...mapState({
      stepFraction: (state) => (ENV_MOBILE_DEVICE ? state.mobile.stepFraction : null),
    }),
    guideTemplate() {
      const { tag } = this.transaction;
      if (tag === Tag.SpendTx) return this.$t('modal.confirm-transaction-sign.guide-spend');
      if (tag === Tag.NameClaimTx && isAuctionName(this.transaction.name)) {
        return this.$t('modal.confirm-transaction-sign.guide-name-bid');
      }
      return this.$t('modal.confirm-transaction-sign.guide', {
        title:
          {
            [Tag.ContractCreateTx]: this.$t('modal.confirm-transaction-sign.contract-create'),
            [Tag.ContractCallTx]: this.$t('modal.confirm-transaction-sign.contract-call'),
            [Tag.NamePreclaimTx]: this.$t('modal.confirm-transaction-sign.name-pre-claim'),
            [Tag.NameClaimTx]: this.$t('modal.confirm-transaction-sign.name-claim'),
            [Tag.NameUpdateTx]: this.$t('modal.confirm-transaction-sign.name-update'),
            [Tag.NameTransferTx]: this.$t('modal.confirm-transaction-sign.name-transfer'),
          }[tag] || '',
      });
    },
    maxFee() {
      const recommendedMax = this.transaction.minFee.multipliedBy(10);
      const actualMax = this.account.balance
        .minus(this.transaction.amount || 0)
        .minus(this.transaction.nameFee || 0);
      return actualMax.isLessThan(recommendedMax) ? actualMax : recommendedMax;
    },
    isEnoughFounds() {
      return this.transaction.minFee.isLessThanOrEqualTo(this.maxFee);
    },
  },
  methods: {
    denyHandler() {
      this.reject(new Error('Rejected by user'));
    },
    async allowHandler() {
      if (!this.isEnoughFounds) {
        await this.$store.dispatch('modals/open', {
          name: 'confirm',
          text: this.$t('modal.confirm-transaction-sign.confirm-message'),
        });
      }
      this.resolve(this.newFee);
    },
  },
};
</script>

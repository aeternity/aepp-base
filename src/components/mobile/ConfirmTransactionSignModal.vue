<template>
  <Page
    :modal="!$globals.IS_MOBILE_DEVICE"
    fill="primary"
    hide-tab-bar
    right-button-icon-name="close"
    @right-button-click="denyHandler"
  >
    <Guide
      :template="guideTemplate"
      fill="neutral"
    >
      <AeFraction
        v-if="stepFraction"
        slot="icon"
        v-bind="stepFraction"
      />
      <AccountInline
        slot="senderAddress"
        :address="account.address"
      />
      <AccountInline
        slot="recipientAddress"
        :address="transaction.recipientId"
      />
    </Guide>

    <DetailsAmountCurrency
      v-if="transaction.amount"
      :amount="transaction.amount"
    />

    <DetailsFeeInput
      v-model="newFee"
      :min="transaction.minFee"
      :max="maxFee"
    />

    <DetailsList
      :object="transaction"
      :field-renderers="TX_FIELDS"
    />

    <AeButtonGroup slot="footer">
      <AeButton
        fill="light"
        @click="denyHandler"
      >
        {{ $t('cancel') }}
      </AeButton>
      <AeButton
        fill="secondary"
        @click="allowHandler"
      >
        {{ $t('confirm') }}
      </AeButton>
    </AeButtonGroup>
  </Page>
</template>

<script>
import { mapState } from 'vuex';
import { SCHEMA } from '@aeternity/aepp-sdk';
import Page from '../Page.vue';
import Guide from '../Guide.vue';
import AeFraction from '../AeFraction.vue';
import AccountInline from '../AccountInline.vue';
import DetailsAmountCurrency from './DetailsAmountCurrency.vue';
import DetailsFeeInput from './DetailsFeeInput.vue';
import DetailsList from './DetailsList.vue';
import {
  Payload, RecipientId, Code, CallData, ContractId,
  CommitmentId, NameEncoded, NameSalt, NameId, NameFee,
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
      TX_TYPE: SCHEMA.TX_TYPE,
      TX_FIELDS: {
        payload: Payload,
        recipientId: RecipientId,
        code: Code,
        callData: CallData,
        contractId: ContractId,
        commitmentId: CommitmentId,
        name: NameEncoded,
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
      stepFraction: state => (process.env.IS_MOBILE_DEVICE ? state.mobile.stepFraction : null),
    }),
    txType() {
      return SCHEMA.OBJECT_ID_TX_TYPE[this.transaction.tag];
    },
    guideTemplate() {
      if (this.txType === SCHEMA.TX_TYPE.spend) return this.$t('modal.confirm-transaction-sign.guide-spend');
      if (this.txType === SCHEMA.TX_TYPE.nameClaim && !+this.transaction.nameSalt) {
        return this.$t('modal.confirm-transaction-sign.guide-name-bid');
      }
      return this.$t('modal.confirm-transaction-sign.guide', {
        title: {
          [SCHEMA.TX_TYPE.contractCreate]: this.$t('modal.confirm-transaction-sign.contract-create'),
          [SCHEMA.TX_TYPE.contractCall]: this.$t('modal.confirm-transaction-sign.contract-call'),
          [SCHEMA.TX_TYPE.namePreClaim]: this.$t('modal.confirm-transaction-sign.name-pre-claim'),
          [SCHEMA.TX_TYPE.nameClaim]: this.$t('modal.confirm-transaction-sign.name-claim'),
          [SCHEMA.TX_TYPE.nameUpdate]: this.$t('modal.confirm-transaction-sign.name-update'),
          [SCHEMA.TX_TYPE.nameTransfer]: this.$t('modal.confirm-transaction-sign.name-transfer'),
        }[this.txType] || '',
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

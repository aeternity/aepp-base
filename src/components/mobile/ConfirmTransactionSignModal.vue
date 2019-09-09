<template>
  <MobilePage
    fill="primary"
    hide-tab-bar
    right-button-icon-name="close"
    @right-button-click="denyHandler"
  >
    <Guide
      :template="txType === TX_TYPE.spend
        ? $t('modal.confirm-transaction-sign.guide-spend')
        : $t('modal.confirm-transaction-sign.guide', { title })"
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

    <template v-for="fieldName in Object.keys(TX_FIELDS)">
      <component
        :is="TX_FIELDS[fieldName]"
        v-if="transaction[fieldName]"
        :key="fieldName"
        :value="transaction[fieldName]"
      />
    </template>

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
  </MobilePage>
</template>

<script>
import { mapState } from 'vuex';
import { Crypto } from '@aeternity/aepp-sdk/es';
import { OBJECT_ID_TX_TYPE, TX_TYPE } from '@aeternity/aepp-sdk/es/tx/builder/schema';
import { AENS_DOMAIN } from '../../lib/constants';
import MobilePage from './Page.vue';
import Guide from '../Guide.vue';
import AeFraction from '../AeFraction.vue';
import AccountInline from '../AccountInline.vue';
import DetailsAmountCurrency from './DetailsAmountCurrency.vue';
import DetailsFeeInput from './DetailsFeeInput.vue';
import DetailsRawData from './DetailsRawData.vue';
import DetailsAddress from './DetailsAddress.vue';
import DetailsField from './DetailsField.vue';
import DetailsNamePointers from './DetailsNamePointers.vue';
import AeButtonGroup from '../AeButtonGroup.vue';
import AeButton from '../AeButton.vue';

const genDetailsWrapper = (Component, valueFieldName) => (name, otherProps) => ({
  functional: true,
  render(createElement, { props: { value } }) {
    return createElement(Component, { attrs: { ...otherProps, name, [valueFieldName]: value } });
  },
});

const genDetailsRawData = genDetailsWrapper(DetailsRawData, 'data');
const genDetailsAddress = genDetailsWrapper(DetailsAddress, 'address');
const genDetailsField = genDetailsWrapper(DetailsField, 'value');

export default {
  components: {
    MobilePage,
    Guide,
    AeFraction,
    AccountInline,
    DetailsAmountCurrency,
    DetailsFeeInput,
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
      TX_TYPE,
    };
  },
  subscriptions() {
    return { account: this.$store.state.observables.activeAccount };
  },
  computed: {
    ...mapState({
      stepFraction: state => state.mobile.stepFraction,
    }),
    txType() {
      return OBJECT_ID_TX_TYPE[this.transaction.tag];
    },
    title() {
      return {
        [TX_TYPE.contractCreate]: this.$t('modal.confirm-transaction-sign.contract-create'),
        [TX_TYPE.contractCall]: this.$t('modal.confirm-transaction-sign.contract-call'),
        [TX_TYPE.namePreClaim]: this.$t('modal.confirm-transaction-sign.name-pre-claim'),
        [TX_TYPE.nameClaim]: this.$t('modal.confirm-transaction-sign.name-claim'),
        [TX_TYPE.nameUpdate]: this.$t('modal.confirm-transaction-sign.name-update'),
        [TX_TYPE.nameTransfer]: this.$t('modal.confirm-transaction-sign.name-transfer'),
      }[this.txType] || '';
    },
    maxFee() {
      const recommendedMax = this.transaction.minFee.multipliedBy(10);
      const amount = this.transaction.amount || 0;
      const actualMax = this.account.balance.minus(amount);
      return actualMax.isLessThan(recommendedMax) ? actualMax : recommendedMax;
    },
    isEnoughFounds() {
      return this.transaction.minFee.isLessThanOrEqualTo(this.maxFee);
    },
    TX_FIELDS() {
      return {
        payload: {
          functional: true,
          render: (createElement, { props: { value } }) => {
            const data = Crypto.decodeBase64Check(Crypto.assertedType(value, 'ba')).toString();
            return data
              ? createElement(DetailsRawData, {
                attrs: { name: this.$t('modal.confirm-transaction-sign.payload'), data },
              })
              : null;
          },
        },
        recipientId: genDetailsAddress(this.$t('modal.confirm-transaction-sign.recipient-account')),
        code: genDetailsRawData(this.$t('modal.confirm-transaction-sign.contract-compiled-code')),
        callData: genDetailsRawData(this.$t('modal.confirm-transaction-sign.call-data')),
        contractId: genDetailsAddress(this.$t('modal.confirm-transaction-sign.contract-address')),
        commitmentId: genDetailsRawData(this.$t('modal.confirm-transaction-sign.commitment')),
        name: {
          functional: true,
          render: (createElement, { props: { value } }) => createElement(DetailsField, {
            attrs: {
              name: 'Name',
              value: Crypto.decodeBase58Check(Crypto.assertedType(value, 'nm')).toString().replace(AENS_DOMAIN, ''),
            },
          }),
        },
        nameSalt: genDetailsField(this.$t('modal.confirm-transaction-sign.name-salt')),
        nameId: genDetailsRawData(this.$t('modal.confirm-transaction-sign.name-id')),
        pointers: DetailsNamePointers,
      };
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
          text: `
            Looks like you don't have enough funds to make this transaction.
            Are you sure want to continue?
          `,
        });
      }
      this.resolve(this.newFee);
    },
  },
};
</script>

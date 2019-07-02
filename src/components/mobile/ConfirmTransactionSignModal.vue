<template>
  <MobilePage
    fill="primary"
    hide-tab-bar
    right-button-icon-name="close"
    @right-button-click="denyHandler"
  >
    <Guide fill="neutral">
      <AeFraction
        v-if="stepFraction"
        slot="icon"
        v-bind="stepFraction"
      />
      <template v-if="txType === TX_TYPE.spend">
        <em>Complete your transfer</em>
        <br>from
        <AccountInline :address="account.address" />
        <br>to
        <AccountInline :address="transaction.recipientId" />
      </template>
      <template v-else>
        <em>{{ title }}</em>
        <br>by
        <AccountInline :address="account.address" />
      </template>
    </Guide>

    <DetailsAmount :amount="transaction.amount" />

    <DetailsFeeInput
      v-model="newFee"
      :min="transaction.minFee"
      :amount="transaction.amount"
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
        Cancel
      </AeButton>
      <AeButton
        fill="secondary"
        @click="allowHandler"
      >
        Confirm
      </AeButton>
    </AeButtonGroup>
  </MobilePage>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { OBJECT_ID_TX_TYPE, TX_TYPE } from '@aeternity/aepp-sdk/es/tx/builder/schema';
import MobilePage from './Page.vue';
import Guide from '../Guide.vue';
import AeFraction from '../AeFraction.vue';
import AccountInline from '../AccountInline.vue';
import DetailsAmount from './DetailsAmount.vue';
import DetailsFeeInput from './DetailsFeeInput.vue';
import DetailsRawData from './DetailsRawData.vue';
import DetailsAddress from './DetailsAddress.vue';
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

const TX_FIELDS = {
  payload: genDetailsRawData('Payload'),
  recipientId: genDetailsAddress('Recipient Account'),
  code: genDetailsRawData('Contract compiled code'),
  callData: genDetailsRawData('Call data'),
  contractId: genDetailsAddress('Contract Address'),
  commitmentId: genDetailsRawData('Commitment'),
};

export default {
  components: {
    MobilePage,
    Guide,
    AeFraction,
    AccountInline,
    DetailsAmount,
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
      TX_FIELDS,
    };
  },
  computed: {
    ...mapGetters('accounts', { account: 'active' }),
    ...mapState({
      stepFraction: state => state.mobile.stepFraction,
    }),
    txType() {
      return OBJECT_ID_TX_TYPE[this.transaction.tag];
    },
    title() {
      return {
        [TX_TYPE.contractCreate]: 'Create a new contract',
        [TX_TYPE.contractCall]: 'Call contract method',
      }[this.txType] || '';
    },
  },
  methods: {
    denyHandler() {
      this.reject(new Error('Rejected by user'));
    },
    allowHandler() {
      this.resolve(this.newFee);
    },
  },
};
</script>

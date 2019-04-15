<template>
  <MobilePage
    fill="primary"
    right-button-icon-name="close"
    @right-button-click="denyHandler"
  >
    <Guide fill="neutral">
      <em>Create a new contract</em>
      <br>by
      <AccountInline :address="activeIdentity.address" />
    </Guide>

    <DetailsAmount :amount="amount" />

    <DetailsFeeInput
      v-model="newFee"
      :min="minFee"
    />

    <DetailsRawData
      name="Contract compiled code"
      :data="code"
    />

    <DetailsRawData
      name="Contract constructor call data"
      :data="callData"
    />

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
import MobilePage from './Page.vue';
import Guide from '../Guide.vue';
import AccountInline from '../AccountInline.vue';
import DetailsAmount from './DetailsAmount.vue';
import DetailsFeeInput from './DetailsFeeInput.vue';
import DetailsRawData from './DetailsRawData.vue';
import AeButton from '../AeButton.vue';
import AeButtonGroup from '../AeButtonGroup.vue';
import DetailsAmountFeeMixin from './DetailsAmountFeeMixin';

export default {
  components: {
    MobilePage,
    Guide,
    AccountInline,
    DetailsAmount,
    DetailsFeeInput,
    DetailsRawData,
    AeButton,
    AeButtonGroup,
  },
  mixins: [DetailsAmountFeeMixin],
  props: {
    code: { type: String, required: true },
    callData: { type: String, required: true },
  },
};
</script>

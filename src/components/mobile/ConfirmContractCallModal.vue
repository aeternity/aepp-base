<template>
  <MobilePage
    fill="primary"
    right-button-icon-name="close"
    @right-button-click="denyHandler"
  >
    <Guide fill="neutral">
      <em>Call contract method</em>
      <br>by
      <AeIdenticon
        :address="activeIdentity.address"
        size="s"
      />
      {{ ' ' }}
      <em>{{ activeIdentity.name }}</em>
    </Guide>

    <DetailsAmount :amount="amount" />

    <DetailsFeeInput
      v-model="newFee"
      :min="minFee"
    />

    <DetailsRawData
      name="Method call data"
      :data="callData"
    />

    <DetailsAddress
      name="Contract Address"
      :address="contractId"
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
import { AeIdenticon } from '@aeternity/aepp-components-3';
import MobilePage from './Page.vue';
import Guide from '../Guide.vue';
import DetailsAddress from './DetailsAddress.vue';
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
    AeIdenticon,
    DetailsAddress,
    DetailsAmount,
    DetailsFeeInput,
    DetailsRawData,
    AeButton,
    AeButtonGroup,
  },
  mixins: [DetailsAmountFeeMixin],
  props: {
    callData: { type: String, required: true },
    contractId: { type: String, required: true },
  },
};
</script>

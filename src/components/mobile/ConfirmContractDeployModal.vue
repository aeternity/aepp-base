<template>
  <MobilePage fill="primary">
    <Guide fill="neutral">
      <em>Create a new contract</em>
      <p>
        by
        <AeIdenticon
          :address="activeIdentity.address"
          size="s"
        />
        {{ ' ' }}
        <em>{{ activeIdentity.name }}</em>
      </p>
    </Guide>

    <ConfirmModalAmount :amount="amount" />

    <ConfirmModalFeeInput
      v-model="newFee"
      :min="minFee"
    />

    <ConfirmModalRawData
      name="Contract compiled code"
      :data="code"
    />

    <ConfirmModalRawData
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
import { AeIdenticon } from '@aeternity/aepp-components-3';
import MobilePage from './Page.vue';
import Guide from '../Guide.vue';
import ConfirmModalAmount from './ConfirmModalAmount.vue';
import ConfirmModalFeeInput from './ConfirmModalFeeInput.vue';
import ConfirmModalRawData from './ConfirmModalRawData.vue';
import AeButton from '../AeButton.vue';
import AeButtonGroup from '../AeButtonGroup.vue';
import ConfirmModalAmountFeeMixin from './ConfirmModalAmountFeeMixin';

export default {
  components: {
    MobilePage,
    Guide,
    AeIdenticon,
    ConfirmModalAmount,
    ConfirmModalFeeInput,
    ConfirmModalRawData,
    AeButton,
    AeButtonGroup,
  },
  mixins: [ConfirmModalAmountFeeMixin],
  props: {
    code: { type: String, required: true },
    callData: { type: String, required: true },
  },
};
</script>

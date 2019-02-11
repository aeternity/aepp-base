<template>
  <mobile-page fill="primary">
    <guide fill="neutral">
      <em>Create a new contract</em>
      <br>by
      <ae-identicon
        :address="activeIdentity.address"
        size="s"
      />
      {{ ' ' }}
      <em>{{ activeIdentity.name }}</em>
    </guide>

    <confirm-modal-amount :amount="amount" />

    <confirm-modal-fee-input
      v-model="newFee"
      :min="minFee"
    />

    <confirm-modal-raw-data
      name="Contract compiled code"
      :data="code"
    />

    <confirm-modal-raw-data
      name="Contract constructor call data"
      :data="callData"
    />

    <ae-button-group slot="footer">
      <ae-button
        fill="light"
        @click="denyHandler"
      >
        Cancel
      </ae-button>
      <ae-button
        fill="secondary"
        @click="allowHandler"
      >
        Confirm
      </ae-button>
    </ae-button-group>
  </mobile-page>
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

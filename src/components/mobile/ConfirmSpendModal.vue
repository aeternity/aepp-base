<template>
  <mobile-page
    class="confirm-spend-modal"
    fill="primary"
  >
    <guide fill="neutral">
      <ae-fraction
        v-if="stepFraction"
        slot="icon"
        v-bind="stepFraction"
      />
      <em>Complete your transfer</em>
      <br>from
      <ae-identicon
        :address="activeIdentity.address"
        size="s"
      />
      {{ ' ' }}
      <em>{{ activeIdentity.name }}</em>
      <br>to
      <ae-identicon
        :address="recipientId"
        size="s"
      />
      {{ ' ' }}
      <em>
        <ae-address
          :address="recipientId"
          length="short"
        />
      </em>
    </guide>

    <confirm-modal-amount :amount="amount" />

    <confirm-modal-fee-input
      v-model="newFee"
      :min="minFee"
    />

    <confirm-modal-address
      name="Recipient Account"
      :address="recipientId"
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
import { mapState } from 'vuex';
import { AeIdenticon } from '@aeternity/aepp-components-3';
import MobilePage from './Page.vue';
import ConfirmModalAmount from './ConfirmModalAmount.vue';
import ConfirmModalFeeInput from './ConfirmModalFeeInput.vue';
import ConfirmModalAddress from './ConfirmModalAddress.vue';
import Guide from '../Guide.vue';
import AeFraction from '../AeFraction.vue';
import AeButton from '../AeButton.vue';
import AeAddress from '../AeAddress.vue';
import AeButtonGroup from '../AeButtonGroup.vue';
import ConfirmModalAmountFeeMixin from './ConfirmModalAmountFeeMixin';

export default {
  components: {
    MobilePage,
    Guide,
    AeFraction,
    AeIdenticon,
    AeButton,
    AeButtonGroup,
    AeAddress,
    ConfirmModalAmount,
    ConfirmModalFeeInput,
    ConfirmModalAddress,
  },
  mixins: [ConfirmModalAmountFeeMixin],
  props: {
    recipientId: { type: String, required: true },
  },
  computed: mapState({
    stepFraction: state => state.mobile.stepFraction,
  }),
};
</script>

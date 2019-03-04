<template>
  <MobilePage
    class="confirm-spend-modal"
    fill="primary"
  >
    <Guide fill="neutral">
      <AeFraction
        v-if="stepFraction"
        slot="icon"
        v-bind="stepFraction"
      />
      <em>Complete your transfer</em>
      <p>
        from
        <AeIdenticon
          :address="activeIdentity.address"
          size="s"
        />
        {{ ' ' }}
        <em>{{ activeIdentity.name }}</em>
        to
        <AeIdenticon
          :address="recipientId"
          size="s"
        />
        {{ ' ' }}
        <em>
          <AeAddress
            :address="recipientId"
            length="short"
          />
        </em>
      </p>
    </Guide>

    <ConfirmModalAmount :amount="amount" />

    <ConfirmModalFeeInput
      v-model="newFee"
      :min="minFee"
    />

    <ConfirmModalAddress
      name="Recipient Account"
      :address="recipientId"
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

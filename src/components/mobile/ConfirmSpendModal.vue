<template>
  <MobilePage
    class="confirm-spend-modal"
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
      <em>Complete your transfer</em>
      <br>from
      <AccountInline :address="activeAccount.address" />
      <br>to
      <AccountInline :address="recipientId" />
    </Guide>

    <DetailsAmount :amount="amount" />

    <DetailsFeeInput
      v-model="newFee"
      :min="minFee"
    />

    <DetailsRawData
      v-if="payload"
      name="Payload"
      :data="payload"
    />

    <DetailsAddress
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
import MobilePage from './Page.vue';
import DetailsAmount from './DetailsAmount.vue';
import DetailsFeeInput from './DetailsFeeInput.vue';
import DetailsRawData from './DetailsRawData.vue';
import DetailsAddress from './DetailsAddress.vue';
import Guide from '../Guide.vue';
import AeFraction from '../AeFraction.vue';
import AccountInline from '../AccountInline.vue';
import AeButton from '../AeButton.vue';
import AeButtonGroup from '../AeButtonGroup.vue';
import DetailsAmountFeeMixin from './DetailsAmountFeeMixin';

export default {
  components: {
    MobilePage,
    Guide,
    AeFraction,
    AccountInline,
    AeButton,
    AeButtonGroup,
    DetailsAmount,
    DetailsFeeInput,
    DetailsRawData,
    DetailsAddress,
  },
  mixins: [DetailsAmountFeeMixin],
  props: {
    payload: { type: String, required: true },
    recipientId: { type: String, required: true },
  },
  computed: mapState({
    stepFraction: state => state.mobile.stepFraction,
  }),
};
</script>

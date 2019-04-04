<template>
  <MobilePage
    class="confirm-spend-modal"
    fill="primary"
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
      <AeIdenticon
        :address="activeIdentity.address"
        size="s"
      />
      {{ ' ' }}
      <em>{{ activeIdentity.name }}</em>
      <br>to
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
    </Guide>

    <DetailsAmount :amount="amount" />

    <DetailsFeeInput
      v-model="newFee"
      :min="minFee"
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
import { AeIdenticon } from '@aeternity/aepp-components-3';
import MobilePage from './Page.vue';
import DetailsAmount from './DetailsAmount.vue';
import DetailsFeeInput from './DetailsFeeInput.vue';
import DetailsAddress from './DetailsAddress.vue';
import Guide from '../Guide.vue';
import AeFraction from '../AeFraction.vue';
import AeButton from '../AeButton.vue';
import AeAddress from '../AeAddress.vue';
import AeButtonGroup from '../AeButtonGroup.vue';
import DetailsAmountFeeMixin from './DetailsAmountFeeMixin';

export default {
  components: {
    MobilePage,
    Guide,
    AeFraction,
    AeIdenticon,
    AeButton,
    AeButtonGroup,
    AeAddress,
    DetailsAmount,
    DetailsFeeInput,
    DetailsAddress,
  },
  mixins: [DetailsAmountFeeMixin],
  props: {
    recipientId: { type: String, required: true },
  },
  computed: mapState({
    stepFraction: state => state.mobile.stepFraction,
  }),
};
</script>

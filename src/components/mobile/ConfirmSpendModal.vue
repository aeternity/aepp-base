<template>
  <mobile-page
    class="confirm-spend-modal"
    fill="primary"
  >
    <guide
      fill="neutral"
      :icon="stepIcon"
    >
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

    <confirm-modal-field
      name="Amount"
      :value="`${prefixedAmount(amount)} AE`"
    />

    <confirm-modal-field
      name="Transaction fee"
      :value="`${fee} PICO AE`"
    >
      <confirm-modal-row class="turtle-rabbit">
        <img src="../../assets/icons/turtle.svg">
        <img src="../../assets/icons/rabbit.svg">
      </confirm-modal-row>

      <ae-input-range
        v-model="fee"
        fill="light"
        :min="MIN_SPEND_TX_FEE_PICO"
        :max="MAX_REASONABLE_FEE_PICO"
        step="0.001"
      />
    </confirm-modal-field>

    <confirm-modal-field name="Recipient Account">
      <ae-address
        :address="recipientId"
        split-by="6"
      />
    </confirm-modal-field>

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
import BigNumber from 'bignumber.js';
import { mapGetters } from 'vuex';
import { AeIdenticon } from '@aeternity/aepp-components-3';
import MobilePage from './Page.vue';
import ConfirmModalField from './ConfirmModalField.vue';
import ConfirmModalRow from './ConfirmModalRow.vue';
import Guide from '../Guide.vue';
import AeInputRange from '../AeInputRange.vue';
import AeButton from '../AeButton.vue';
import AeAddress from '../AeAddress.vue';
import AeButtonGroup from '../AeButtonGroup.vue';
import { MIN_SPEND_TX_FEE_PICO, MAX_REASONABLE_FEE_PICO, MAGNITUDE_PICO } from '../../lib/constants';
import prefixedAmount from '../../filters/prefixedAmount';

export default {
  components: {
    MobilePage,
    Guide,
    AeIdenticon,
    AeInputRange,
    AeButton,
    AeButtonGroup,
    AeAddress,
    ConfirmModalField,
    ConfirmModalRow,
  },
  props: {
    stepIcon: { type: String, default: '' },
    recipientId: { type: String, required: true },
    amount: { type: BigNumber, required: true },
    resolve: { type: Function, required: true },
    reject: { type: Function, required: true },
  },
  data: () => ({
    MIN_SPEND_TX_FEE_PICO,
    MAX_REASONABLE_FEE_PICO,
    fee: MIN_SPEND_TX_FEE_PICO,
  }),
  computed: mapGetters(['activeIdentity']),
  methods: {
    prefixedAmount,
    denyHandler() {
      this.reject(new Error('Rejected by user'));
    },
    allowHandler() {
      this.resolve(BigNumber(this.fee).shiftedBy(MAGNITUDE_PICO));
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.confirm-spend-modal.mobile-page .confirm-modal-field {
  .turtle-rabbit {
    margin: rem(23px) 0 rem(6px) 0;
  }

  .ae-address {
    font-weight: normal;
    color: $color-neutral-maximum;
    letter-spacing: rem(1.5px);
  }
}
</style>

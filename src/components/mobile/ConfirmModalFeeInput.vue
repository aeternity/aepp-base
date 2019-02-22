<template>
  <ConfirmModalField
    class="confirm-modal-fee-input"
    name="Transaction fee"
    :value="`${toPicoString(value)} PICO AE`"
  >
    <ConfirmModalRow class="turtle-rabbit">
      <img src="../../assets/icons/turtle.svg">
      <img src="../../assets/icons/rabbit.svg">
    </ConfirmModalRow>

    <AeInputRange
      fill="light"
      :value="value | toPicoString"
      :min="min | toPicoString"
      :max="min.multipliedBy(10) | toPicoString"
      step="0.001"
      @input="$emit('input', toBigNumber($event))"
    />
  </ConfirmModalField>
</template>

<script>
import BigNumber from 'bignumber.js';
import ConfirmModalField from './ConfirmModalField.vue';
import ConfirmModalRow from './ConfirmModalRow.vue';
import AeInputRange from '../AeInputRange.vue';
import { MAGNITUDE_PICO } from '../../lib/constants';

const toPicoString = value => value.shiftedBy(-MAGNITUDE_PICO).toFixed();
const toBigNumber = value => BigNumber(value).shiftedBy(MAGNITUDE_PICO);

export default {
  components: {
    AeInputRange,
    ConfirmModalField,
    ConfirmModalRow,
  },
  filters: { toPicoString },
  props: {
    value: { type: BigNumber, required: true },
    min: { type: BigNumber, required: true },
  },
  methods: { toPicoString, toBigNumber },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';

.confirm-modal-fee-input {
  .turtle-rabbit {
    margin: rem(23px) 0 rem(6px) 0;
  }
}
</style>

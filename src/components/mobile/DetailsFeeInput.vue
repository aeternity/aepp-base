<template>
  <DetailsField
    class="details-fee-input"
    :name="$t('modal.confirm-transaction-sign.details-fee-input.title')"
    :value="
      $t('modal.confirm-transaction-sign.details-fee-input.value', { value: toMicroString(value) })
    "
    value-monospace
  >
    <template v-if="min.isLessThan(max)">
      <DetailsRow class="turtle-rabbit">
        <img src="../../assets/icons/turtle.svg" />
        <img src="../../assets/icons/rabbit.svg" />
      </DetailsRow>

      <AeInputRange
        fill="light"
        :value="value | toMicroString"
        :min="min | toMicroString"
        :max="max | toMicroString"
        step="0.01"
        @input="$emit('input', toBigNumber($event))"
      />
    </template>
  </DetailsField>
</template>

<script>
import BigNumber from 'bignumber.js';
import DetailsField from './DetailsField.vue';
import DetailsRow from './DetailsRow.vue';
import AeInputRange from '../AeInputRange.vue';
import { MAGNITUDE_MICRO } from '../../lib/constants';

const toMicroString = (value) => value.shiftedBy(-MAGNITUDE_MICRO).toFixed();
const toBigNumber = (value) => BigNumber(value).shiftedBy(MAGNITUDE_MICRO);

export default {
  components: {
    AeInputRange,
    DetailsField,
    DetailsRow,
  },
  filters: { toMicroString },
  props: {
    value: { type: BigNumber, required: true },
    min: { type: BigNumber, required: true },
    max: { type: BigNumber, required: true },
  },
  methods: { toMicroString, toBigNumber },
};
</script>

<style lang="scss" scoped>
@use '../../styles/functions';

.details-fee-input {
  .turtle-rabbit {
    margin: functions.rem(23px) 0 functions.rem(6px) 0;
  }
}
</style>

<template>
  <DetailsField
    class="details-fee-input"
    name="Transaction fee"
    :value="`${toMicroString(value)} MICRO AE`"
    value-monospace
  >
    <template v-if="min.isLessThan(max)">
      <DetailsRow class="turtle-rabbit">
        <img src="../../assets/icons/turtle.svg">
        <img src="../../assets/icons/rabbit.svg">
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
import { pick } from 'lodash-es';
import BigNumber from 'bignumber.js';
import DetailsField from './DetailsField.vue';
import DetailsRow from './DetailsRow.vue';
import AeInputRange from '../AeInputRange.vue';
import { MAGNITUDE_MICRO } from '../../lib/constants';

const toMicroString = value => value.shiftedBy(-MAGNITUDE_MICRO).toFixed();
const toBigNumber = value => BigNumber(value).shiftedBy(MAGNITUDE_MICRO);

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
    amount: { type: BigNumber, default: null },
  },
  subscriptions() {
    return pick(this.$store.state.observables, ['activeAccount']);
  },
  computed: {
    max() {
      const recommendedMax = this.min.multipliedBy(10);
      if (!this.amount) return recommendedMax;
      const actualMax = this.activeAccount.balance.minus(this.amount);
      return actualMax.isLessThan(recommendedMax) ? actualMax : recommendedMax;
    },
  },
  methods: { toMicroString, toBigNumber },
};
</script>

<style lang="scss" scoped>
@import '../../styles/globals/functions.scss';

.details-fee-input {
  .turtle-rabbit {
    margin: rem(23px) 0 rem(6px) 0;
  }
}
</style>

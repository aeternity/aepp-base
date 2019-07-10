<template>
  <DetailsField v-bind="$attrs">
    <AeAddress :address="address" />
  </DetailsField>
</template>

<script>
import DetailsField from './DetailsField.vue';
import AeAddress from '../AeAddress.vue';

export default {
  components: { DetailsField, AeAddress },
  props: {
    address: { type: String, required: true },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/globals/functions.scss';
@import '../../styles/variables/colors.scss';

.details-field .ae-address {
  color: var(--color-primary, $color-neutral-maximum);
}
</style>

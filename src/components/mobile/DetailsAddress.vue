<template>
  <DetailsField
    v-bind="$attrs"
    :fill="fill"
  >
    <AeAddress
      :class="fill"
      :address="address"
    />
  </DetailsField>
</template>

<script>
import DetailsField from './DetailsField.vue';
import AeAddress from '../AeAddress.vue';
import DetailsFillMixin from './DetailsFillMixin';

export default {
  components: { DetailsField, AeAddress },
  mixins: [DetailsFillMixin],
  props: {
    address: { type: String, required: true },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.details-field {
  .ae-address {
    font-weight: normal;
    letter-spacing: rem(1.5px);

    &.neutral {
      color: $color-neutral-maximum;
    }

    &.dark {
      color: $color-neutral-negative-3;
    }
  }
}
</style>

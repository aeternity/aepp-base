<template>
  <ConfirmModalField
    class="confirm-modal-address"
    v-bind="$attrs"
  >
    <AeAddress :address="address" />
  </ConfirmModalField>
</template>

<script>
import ConfirmModalField from './ConfirmModalField.vue';
import AeAddress from '../AeAddress.vue';

export default {
  components: { ConfirmModalField, AeAddress },
  props: {
    address: { type: String, required: true },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.confirm-modal-field {
  .ae-address {
    font-weight: normal;
    color: $color-neutral-maximum;
    letter-spacing: rem(1.5px);
  }
}
</style>

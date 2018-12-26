<template>
  <ae-modal-light
    v-if="address"
    title="Confirm your Ledger address"
    class="ledger-address-confirm"
  >
    <span>Check your Ledger and confirm if the address below is the same</span>
    <div class="address-confirm">
      <div class="label">
        Address from: <strong>Ledger</strong>
      </div>
      <ae-address
        :address="address"
        split-by="9"
      />
    </div>
  </ae-modal-light>
</template>

<script>
import { mapState } from 'vuex';
import AeModalLight from '../AeModalLight.vue';
import AeAddress from '../AeAddress.vue';

export default {
  components: {
    AeModalLight,
    AeAddress,
  },
  computed: mapState({
    address: ({ desktop: { showConfirmModalForAddress } }) => showConfirmModalForAddress,
  }),
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';

.ledger-address-confirm {
  .address-confirm {
    margin: rem(60px) 0;
    padding: rem(20px);
    padding-top: rem(10px);
    background-color: $color-neutral-positive-3;
    border-radius: rem(4px);

    .label {
      margin-bottom: rem(8px);
      color: $color-focus;
    }

    .ae-address {
      font-weight: normal;
    }
  }

  .ae-button {
    width: rem(400px);
  }
}
</style>

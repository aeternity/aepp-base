<template>
  <ae-modal-light
    v-if="address"
    title="Confirm your Ledger address"
    class="ledger-address-confirm"
  >
    <span>Check your Ledger and confirm if the address below is the same</span>

    <ae-address-panel
      title="Ledger Address"
      :address="address"
    />
  </ae-modal-light>
</template>

<script>
import { mapState } from 'vuex';
import AeModalLight from '../AeModalLight.vue';
import AeAddressPanel from './AeAddressPanel.vue';

export default {
  components: {
    AeModalLight,
    AeAddressPanel,
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
  .ae-address-panel {
    margin: rem(60px) auto;
  }
}
</style>

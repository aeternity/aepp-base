<template>
  <span class="account-inline">
    <AeIdenticon :address="address" />
    <template v-if="name">
      {{ name }}
    </template>
    <AeAddress
      v-else
      :address="address"
      length="short"
    />
  </span>
</template>

<script>
import { AeIdenticon } from '@aeternity/aepp-components-3';
import AeAddress from './AeAddress.vue';

export default {
  components: { AeIdenticon, AeAddress },
  props: {
    address: { type: String, required: true },
  },
  computed: {
    name() {
      return (
        [...this.$store.getters.accounts, ...this.$store.state.addressBook]
          .find(({ address }) => address === this.address) || { name: '' }
      ).name;
    },
  },
};
</script>

<style lang="scss" scoped>
.account-inline .ae-identicon {
  vertical-align: middle;
  height: 1.055em;
}
</style>

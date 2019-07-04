<template>
  <span class="account-inline">
    <AeIdenticon :address="address" />{{ ' ' }}
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
import { mapState } from 'vuex';
import AeIdenticon from './AeIdenticon.vue';
import AeAddress from './AeAddress.vue';

export default {
  components: { AeIdenticon, AeAddress },
  props: {
    address: { type: String, required: true },
  },
  computed: mapState('accounts', {
    name({ list }, { getName }) {
      const account = list.find(({ address }) => address === this.address);
      return account ? getName(account) : '';
    },
  }),
};
</script>

<style lang="scss" scoped>
.account-inline .ae-identicon {
  vertical-align: middle;
  height: 1.055em;
}
</style>

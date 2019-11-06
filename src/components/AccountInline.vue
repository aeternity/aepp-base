<template>
  <span
    v-copy-on-click="address"
    class="account-inline"
    :class="{ address: !nameFromStore }"
  >
    <AeIdenticon :address="addressFromStore" />
    {{ nameFromStore ? nameFromStore : formatAddress(addressFromStore, 'short') }}
  </span>
</template>

<script>
import { mapState } from 'vuex';
import formatAddress from '../filters/formatAddress';
import copyOnClick from '../directives/copyOnClick';
import AeIdenticon from './AeIdenticon.vue';

export default {
  components: { AeIdenticon },
  directives: { copyOnClick },
  props: {
    address: { type: String, required: true },
  },
  computed: mapState('names', {
    addressFromStore(state, { getAddress }) {
      return getAddress(this.address);
    },
    nameFromStore(state, { get }) {
      return get(this.address);
    },
  }),
  methods: { formatAddress },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables';
@import 'copied';

.account-inline {
  &.address {
    font-family: $font-mono;
  }

  &.v-copied {
    @extend %copied;
  }

  .ae-identicon {
    vertical-align: middle;
    height: 1.055em;
  }
}
</style>

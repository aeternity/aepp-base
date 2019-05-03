<template>
  <MobilePage
    v-if="addressBook.length"
    class="address-book-choose"
    title="Addresses"
  >
    <ListItemAccount
      v-for="(c, idx) in addressBook"
      :key="`${idx}-address`"
      :name="c.name"
      :address="c.address"
      :subtitle="`${c.address.slice(0, 6)}···${c.address.slice(-3)}`"
      :to="path(c.address)"
    >
      <AeIcon
        slot="right"
        name="back"
      />
    </ListItemAccount>

    <ButtonAddFixed :to="{ name: 'address-book-new' }" />
  </MobilePage>
  <AddressBookNoContacts v-else />
</template>

<script>
import { mapState } from 'vuex';
import { AeIcon } from '@aeternity/aepp-components-3';
import AddressBookNoContacts from './AddressBookNoContacts.vue';
import ButtonAddFixed from '../components/ButtonAddFixed.vue';
import ListItemAccount from '../components/ListItemAccount.vue';
import MobilePage from '../components/mobile/Page.vue';

export default {
  components: {
    AeIcon,
    ListItemAccount,
    AddressBookNoContacts,
    ButtonAddFixed,
    MobilePage,
  },
  props: {
    redirectPathTemplate: { type: String, required: true },
  },
  computed: mapState(['addressBook']),
  methods: {
    path(address) {
      return this.redirectPathTemplate.replace(/{address}/g, address);
    },
  },
};
</script>

<style lang="scss" scoped>
.address-book-choose .ae-icon {
  transform: rotate(135deg);
}
</style>

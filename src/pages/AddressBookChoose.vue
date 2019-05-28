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
      <Back slot="right" />
    </ListItemAccount>

    <ButtonAddFixed :to="{ name: 'address-book-new' }" />
  </MobilePage>
  <AddressBookNoContacts v-else />
</template>

<script>
import { mapState } from 'vuex';
import AddressBookNoContacts from './AddressBookNoContacts.vue';
import ButtonAddFixed from '../components/ButtonAddFixed.vue';
import ListItemAccount from '../components/ListItemAccount.vue';
import { Back } from '../components/icons';
import MobilePage from '../components/mobile/Page.vue';

export default {
  components: {
    ListItemAccount,
    Back,
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
.address-book-choose .icon.back {
  transform: rotate(135deg);
}
</style>

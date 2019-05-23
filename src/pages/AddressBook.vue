<template>
  <MobilePage
    v-if="addressBook.length"
    title="Addresses"
  >
    <ListItemAccount
      v-for="(c, idx) in addressBook"
      :key="`${idx}-address`"
      :name="c.name"
      :address="c.address"
      :subtitle="`${c.address.slice(0, 6)}···${c.address.slice(-3)}`"
      :to="{ name: 'send-to', params: { to: c.address } }"
    >
      <Transfer slot="right" />
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
import { Transfer } from '../components/icons';
import MobilePage from '../components/mobile/Page.vue';

export default {
  components: {
    ListItemAccount,
    Transfer,
    AddressBookNoContacts,
    ButtonAddFixed,
    MobilePage,
  },
  computed: mapState(['addressBook']),
};
</script>

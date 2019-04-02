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
      <AeIcon
        slot="right"
        name="transfer"
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
  computed: mapState(['addressBook']),
};
</script>

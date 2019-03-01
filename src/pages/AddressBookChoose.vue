<template>
  <MobilePage
    v-if="addressBook.length"
    class="address-book"
    title="Addresses"
  >
    <AeDivider />
    <template v-for="(c, idx) in addressBook">
      <AeLink
        :key="`${idx}-address`"
        :to="path(c.address)"
      >
        <AddressBookItem
          :name="c.name"
          :address="c.address"
        >
          <AeIcon
            slot="icon"
            name="arrow"
            rotate="-45"
          />
        </AddressBookItem>
      </AeLink>
      <AeDivider :key="`${idx}-divider`" />
    </template>

    <ButtonAddFixed
      :to="{ name: 'address-book-new' }"
      quick-id
    />
  </MobilePage>
  <AddressBookNoContacts v-else />
</template>

<script>
import { mapState } from 'vuex';
import { AeIcon, AeDivider } from '@aeternity/aepp-components';
import AddressBookNoContacts from './AddressBookNoContacts.vue';
import ButtonAddFixed from '../components/ButtonAddFixed.vue';
import AddressBookItem from '../components/AddressBookItem.vue';
import AeLink from '../components/AeLink.vue';
import MobilePage from '../components/mobile/Page.vue';

export default {
  components: {
    AeIcon,
    AeDivider,
    AeLink,
    AddressBookNoContacts,
    ButtonAddFixed,
    AddressBookItem,
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

<style lang="scss" scoped src="./AddressBook.scss" />

<style lang="scss" scoped>
.address-book .ae-link {
  text-decoration: none;
}
</style>

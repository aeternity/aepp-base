<template>
  <mobile-page
    v-if="addressBook.length"
    class="address-book"
    title="Addresses"
  >
    <ae-divider />
    <template v-for="(c, idx) in addressBook">
      <ae-link
        :to="path(c.address)"
        :key="`${idx}-address`">
        <address-book-item
          :name="c.name"
          :address="c.address"
        >
          <ae-icon
            slot="icon"
            name="arrow"
            rotate="-45" />
        </address-book-item>
      </ae-link>
      <ae-divider :key="`${idx}-divider`" />
    </template>

    <fixed-add-button
      :to="{ name: 'address-book-new' }"
      quick-id />
  </mobile-page>
  <address-book-no-contacts v-else />
</template>

<script>
import { mapState } from 'vuex'
import { AeIcon, AeDivider, AeLink } from '@aeternity/aepp-components'
import AddressBookNoContacts from './AddressBookNoContacts.vue'
import FixedAddButton from '../components/FixedAddButton.vue'
import AddressBookItem from '../components/AddressBookItem.vue'
import MobilePage from '../components/MobilePage.vue'

export default {
  components: {
    AeIcon,
    AeDivider,
    AeLink,
    AddressBookNoContacts,
    FixedAddButton,
    AddressBookItem,
    MobilePage
  },
  props: {
    'redirect-path-template': { type: String, required: true }
  },
  computed: mapState(['addressBook']),
  methods: {
    path (address) {
      return this.redirectPathTemplate.replace(/{address}/g, address)
    }
  }
}
</script>

<style lang="scss" scoped src="./AddressBook.scss" />

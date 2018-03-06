<template>
  <modal-page
    v-if="addressBook.length"
    class="address-book"
    title="Æddress Book"
    :redirectToOnClose="{ name: 'apps' }"
  >
    <ae-divider />
    <template v-for="c in addressBook">
      <ae-link :to="path(c.address)">
        <address-book-item
          :name="c.name"
          :address="c.address"
        >
          <ae-icon slot="icon" name="arrow" rotate="-45" />
        </address-book-item>
      </ae-link>
      <ae-divider />
    </template>

    <fixed-add-button quick-id :to="{ name: 'address-book-new' }" />
    <quick-id />
  </modal-page>
  <address-book-no-contacts v-else />
</template>

<script>
  import { mapState } from 'vuex'
  import { AeIcon, AeDivider, AeLink } from '@aeternity/aepp-components'
  import AddressBookNoContacts from '@/pages/AddressBookNoContacts.vue'
  import FixedAddButton from '@/components/FixedAddButton.vue'
  import QuickId from '@/components/QuickId.vue'
  import AddressBookItem from '@/components/AddressBookItem.vue'
  import ModalPage from '@/components/ModalPage.vue'

  export default {
    components: {
      AeIcon,
      AeDivider,
      AeLink,
      AddressBookNoContacts,
      FixedAddButton,
      QuickId,
      AddressBookItem,
      ModalPage
    },
    props: {
      'redirect-path-template': String
    },
    computed: mapState(['addressBook']),
    methods: {
      path (address) {
        return this.redirectPathTemplate.replace(/{address}/g, address)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@aeternity/aepp-components/dist/variables.scss';

  .address-book {
    .ae-divider {
      margin: 16px 0;
    }
  }
</style>

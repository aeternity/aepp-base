<template>
  <modal-page
    v-if="addressBook.length"
    class="address-book"
    title="Addresses"
    :redirectToOnClose="{ name: 'apps' }"
  >
    <ae-divider />
    <template v-for="(c, idx) in addressBook">
      <address-book-item
        :name="c.name"
        :address="c.address"
        @click="openIdx = openIdx === idx ? -1 : idx"
        :key="idx"
      >
        <ae-icon slot="icon" name="chevron" :rotate="idx === openIdx ? -90 : 90" />
      </address-book-item>
      <div v-if="idx === openIdx" class="actions">
        <router-link :to="{ name: 'transfer', params: { to: c.address } }">
          <ae-app-icon src="static/icons/aepps/transfer.svg" />
        </router-link>
      </div>
      <ae-divider :key="idx" />
    </template>

    <fixed-add-button quick-id :to="{ name: 'address-book-new' }" />
  </modal-page>
  <address-book-no-contacts v-else />
</template>

<script>
  import { mapState } from 'vuex'
  import { AeIcon, AeAppIcon, AeDivider } from '@aeternity/aepp-components'
  import AddressBookNoContacts from '@/pages/AddressBookNoContacts.vue'
  import AddressBookItem from '@/components/AddressBookItem.vue'
  import FixedAddButton from '@/components/FixedAddButton.vue'
  import ModalPage from '@/components/ModalPage.vue'

  export default {
    components: {
      AeIcon,
      AeAppIcon,
      AeDivider,
      AddressBookItem,
      AddressBookNoContacts,
      FixedAddButton,
      ModalPage
    },
    data: () => ({
      openIdx: -1
    }),
    computed: mapState(['addressBook'])
  }
</script>

<style lang="scss" scoped>
  @import '~@aeternity/aepp-components/dist/variables.scss';

  .address-book {
    .ae-divider {
      margin: 16px 0;
    }

    .actions {
      display: flex;

      .ae-app-icon {
        width: 52px;
        height: 52px;
        box-sizing: border-box;
        margin: 16px 8px 0 8px;
      }
    }
  }
</style>

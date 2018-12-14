<template>
  <mobile-page
    v-if="addressBook.length"
    class="address-book"
    title="Addresses"
  >
    <ae-divider />
    <template v-for="(c, idx) in addressBook">
      <address-book-item
        :key="`${idx}-address`"
        :name="c.name"
        :address="c.address"
        @click="openIdx = openIdx === idx ? -1 : idx"
      >
        <ae-icon
          slot="icon"
          :rotate="idx === openIdx ? -90 : 90"
          name="chevron"
        />
      </address-book-item>
      <div
        v-if="idx === openIdx"
        :key="`${idx}-actions`"
        class="actions"
      >
        <router-link :to="{ name: 'transfer', params: { to: c.address } }">
          <ae-app-icon :src="require('../assets/icons/aepps/transfer.svg')" />
        </router-link>
      </div>
      <ae-divider :key="`${idx}-divider`" />
    </template>

    <fixed-add-button
      :to="{ name: 'address-book-new' }"
      quick-id
    />
  </mobile-page>
  <address-book-no-contacts v-else />
</template>

<script>
import { mapState } from 'vuex';
import { AeIcon, AeAppIcon, AeDivider } from '@aeternity/aepp-components';
import AddressBookNoContacts from './AddressBookNoContacts.vue';
import AddressBookItem from '../components/AddressBookItem.vue';
import FixedAddButton from '../components/FixedAddButton.vue';
import MobilePage from '../components/MobilePage.vue';

export default {
  components: {
    AeIcon,
    AeAppIcon,
    AeDivider,
    AddressBookItem,
    AddressBookNoContacts,
    FixedAddButton,
    MobilePage,
  },
  data: () => ({
    openIdx: -1,
  }),
  computed: mapState(['addressBook']),
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components/dist/variables.scss';

.address-book {
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
<style lang="scss" scoped src="./AddressBook.scss" />

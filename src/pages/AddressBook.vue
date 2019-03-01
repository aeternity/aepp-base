<template>
  <MobilePage
    v-if="addressBook.length"
    class="address-book"
    title="Addresses"
  >
    <AeDivider />
    <template v-for="(c, idx) in addressBook">
      <AddressBookItem
        :key="`${idx}-address`"
        :name="c.name"
        :address="c.address"
        @click="openIdx = openIdx === idx ? -1 : idx"
      >
        <AeIcon
          slot="icon"
          :rotate="idx === openIdx ? -90 : 90"
          name="chevron"
        />
      </AddressBookItem>
      <div
        v-if="idx === openIdx"
        :key="`${idx}-actions`"
        class="actions"
      >
        <RouterLink :to="{ name: 'transfer', params: { to: c.address } }">
          <AeAppIcon :src="require('../assets/icons/aepps/transfer.svg')" />
        </RouterLink>
      </div>
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
import { AeIcon, AeAppIcon, AeDivider } from '@aeternity/aepp-components';
import AddressBookNoContacts from './AddressBookNoContacts.vue';
import AddressBookItem from '../components/AddressBookItem.vue';
import ButtonAddFixed from '../components/ButtonAddFixed.vue';
import MobilePage from '../components/mobile/Page.vue';

export default {
  components: {
    AeIcon,
    AeAppIcon,
    AeDivider,
    AddressBookItem,
    AddressBookNoContacts,
    ButtonAddFixed,
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

<template>
  <MobilePage
    :right-button-to="{ name: 'address-book' }"
    right-button-icon-name="back"
    class="address-book"
    title="Addresses"
  >
    <AeDivider />
    <form @submit.prevent="addAddressBookItem">
      <AeLabel
        :for="`${_uid}-name`"
        :help-text="errors.first('name')"
        help-type="dramatic"
      >
        Contact name
      </AeLabel>
      <AeInput
        :id="`${_uid}-name`"
        v-model="name"
        v-validate="'required'"
        name="name"
      />

      <AeLabel
        :for="`${_uid}-address`"
        :help-text="errors.first('address')"
        help-type="dramatic"
      >
        Contact address
      </AeLabel>
      <AeAddressInput
        :id="`${_uid}-address`"
        v-model="address"
        v-validate="'required|min:51|max:53'"
        name="address"
        placeholder="ak$ ••• ••• ••• ••• ••• ••• ••• ••• ••• ••• ••• ••• ••• ••• ••• •••"
      />
    </form>

    <AeButton
      slot="footer"
      :disabled="errors.any()"
      type="dramatic"
      @click="addAddressBookItem"
    >
      Save contact
    </AeButton>
  </MobilePage>
</template>

<script>
import {
  AeLabel, AeInput, AeAddressInput, AeButton, AeDivider,
} from '@aeternity/aepp-components';
import MobilePage from '../components/mobile/Page.vue';

export default {
  components: {
    AeLabel, AeInput, AeAddressInput, AeButton, AeDivider, MobilePage,
  },
  data: () => ({
    name: '',
    address: '',
  }),
  methods: {
    async addAddressBookItem() {
      if (!await this.$validator.validateAll()) return;
      const { name, address } = this;
      this.$store.commit('addAddressBookItem', { name, address });
      this.$router.push({ name: 'address-book' });
    },
  },
};
</script>

<style lang="scss" scoped src="./AddressBook.scss" />

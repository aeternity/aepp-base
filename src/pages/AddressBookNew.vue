<template>
  <MobilePage
    :left-button-to="{ name: 'address-book' }"
    left-button-icon-name="back"
    title="Addresses"
  >
    <form
      :id="_uid"
      @submit.prevent="addAddressBookItem"
    >
      <AeInput
        v-model="name"
        v-validate="'required'"
        :error="errors.has('name')"
        :footer="errors.first('name')"
        autofocus
        header="Contact name"
        name="name"
      />

      <AeInputAddress
        v-model="address"
        v-validate="'required|address'"
        :error="errors.has('address')"
        :footer="errors.first('address')"
        header="Contact address"
        name="address"
      />
    </form>

    <AeButton
      slot="footer"
      :disabled="errors.any()"
      :form="_uid"
    >
      Save contact
    </AeButton>
  </MobilePage>
</template>

<script>
import MobilePage from '../components/mobile/Page.vue';
import AeInput from '../components/AeInput.vue';
import AeInputAddress from '../components/AeInputAddress.vue';
import AeButton from '../components/AeButton.vue';

export default {
  components: {
    AeInput, AeInputAddress, AeButton, MobilePage,
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

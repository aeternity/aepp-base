<template>
  <mobile-page
    :redirect-to-on-close="{ name: 'address-book' }"
    class="address-book"
    title="Addresses"
    back-button
  >
    <ae-divider />
    <form @submit.prevent="addAddressBookItem">
      <ae-label
        :for="`${_uid}-name`"
        :help-text="errors.first('name')"
        help-type="dramatic"
      >Contact name</ae-label>
      <ae-input
        v-validate="'required'"
        :id="`${_uid}-name`"
        v-model="name"
        name="name"
      />

      <ae-label
        :for="`${_uid}-address`"
        :help-text="errors.first('address')"
        help-type="dramatic"
      >Contact address</ae-label>
      <ae-address-input
        v-validate="'required|min:42'"
        :id="`${_uid}-address`"
        v-model="address"
        :placeholder="`0x••••• ••••••• •••••••\n••••••• ••••••• •••••••`"
        name="address"
      />
    </form>

    <ae-button
      slot="footer"
      :inactive="errors.any()"
      type="dramatic"
      @click="addAddressBookItem">
      Save contact
    </ae-button>
  </mobile-page>
</template>

<script>
import { AeLabel, AeInput, AeAddressInput, AeButton, AeDivider } from '@aeternity/aepp-components'
import MobilePage from '../components/MobilePage.vue'

export default {
  components: { AeLabel, AeInput, AeAddressInput, AeButton, AeDivider, MobilePage },
  data: () => ({
    name: '',
    address: ''
  }),
  methods: {
    async addAddressBookItem () {
      if (!await this.$validator.validateAll()) return
      const { name, address } = this
      this.$store.commit('addAddressBookItem', { name, address })
      this.$router.push({ name: 'address-book' })
    }
  }
}
</script>

<style lang="scss" src="../components/MobilePageContent.scss" scoped />
<style lang="scss" scoped src="./AddressBook.scss" />

<template>
  <mobile-page
    class="address-book"
    title="Addresses"
    :redirectToOnClose="{ name: 'address-book' }"
    back-button
  >
    <ae-divider />
    <form @submit.prevent="addAddressBookItem">
      <ae-label
        :for="`${_uid}-name`"
        help-type="dramatic"
        :help-text="errors.first('name')"
      >Contact name</ae-label>
      <ae-input
        :id="`${_uid}-name`"
        name="name"
        v-model="name"
        v-validate="'required'"
      />

      <ae-label
        :for="`${_uid}-address`"
        help-type="dramatic"
        :help-text="errors.first('address')"
      >Contact address</ae-label>
      <ae-address-input
        :id="`${_uid}-address`"
        name="address"
        v-model="address"
        v-validate="'required|min:42'"
        :placeholder="`0x••••• ••••••• •••••••\n••••••• ••••••• •••••••`"
      />
    </form>

    <ae-button @click="addAddressBookItem" type="dramatic" :inactive="errors.any()" slot="footer">
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

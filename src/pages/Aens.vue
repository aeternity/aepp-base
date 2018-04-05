<template>
  <modal-screen class="aens" title="AENS" :redirectToOnClose="{ name: 'apps' }">
    <div v-if="!domainInfo" class="checkDomain">
      <ae-input placeholder="test.aet" v-model="domainToCheck"></ae-input>
      <ae-button type='boring' @click="checkDomain">Check</ae-button>
    </div>

    <div v-if="doneChecking && domainInfo" class="domainInfo">
      Already Registered
      <ae-address v-if="checkedAddress" :address="checkedAddress"></ae-address>
    </div>

    <div v-if="doneChecking && !domainInfo" class="registerDomain">
      <ae-address-input
        :isBase58="true"
        name="addressToPoint"
        v-model="addressToPoint"
        v-validate="'required|min:97'"
        data-vv-delay="1">
      </ae-address-input>
      <ae-button v-if="!claimInProcess" type='boring' @click="claimDomain">Claim</ae-button>
      <span v-if="claimInProcess">{{statusMessage}}</span>
    </div>

    <quick-id showBackButton/>
  </modal-screen>
</template>


<script>
import { mapGetters } from 'vuex'
import QuickId from '@/components/QuickId.vue'
import ModalScreen from '@/components/ModalScreen'
import {
  AeButton,
  AeInput,
  AeAddressInput,
  AeAddress
} from '@aeternity/aepp-components'

export default {
  name: 'aens',
  data () {
    return {
      statusMessage: '',
      claimInProcess: false,
      domainToCheck: null,
      domainInfo: null,
      doneChecking: false,
      checkedAddress: '',
      addressToPoint: ''
    }
  },
  computed: {
    ...mapGetters([
      'aeternityClient',
      'activeIdentity'
    ])
  },
  components: {
    AeButton,
    AeInput,
    QuickId,
    ModalScreen,
    AeAddressInput,
    AeAddress
  },
  methods: {
    async checkDomain () {
      const nameResult = await this.aeternityClient.aens.getName(this.domainToCheck)
      if (nameResult && nameResult.pointers && typeof nameResult.pointers === 'string') {
        nameResult.pointers = JSON.parse(nameResult.pointers)
      }
      console.log('nameResult', nameResult)
      this.domainInfo = nameResult
      if (nameResult && nameResult.pointers && nameResult.pointers.account_pubkey) {
        this.checkedAddress = nameResult.pointers.account_pubkey
      }
      this.doneChecking = true
    },
    async claimDomain () {
      this.claimInProcess = true
      this.statusMessage = 'Starting to claim Domain'
      const salt = Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER))
      const preClaimResult = await this.$store.dispatch('preClaimDomain', { domain: this.domainToCheck, salt: salt })
      console.log(preClaimResult)
      this.statusMessage = 'Waiting on pre-claim to be mined'
      await this.$store.dispatch('waitForTransaction', { txHash: preClaimResult['tx_hash'] })
      this.statusMessage = 'Starting claim'
      const claimResult = await this.$store.dispatch('claimDomain', { domain: this.domainToCheck, salt: salt })
      console.log(claimResult)
      this.statusMessage = 'Waiting on claim to be mined'
      await this.$store.dispatch('waitForTransaction', { txHash: claimResult['tx_hash'] })
      this.statusMessage = 'Getting domain info'
      const getDomainResult = await this.$store.dispatch('getDomain', { domain: this.domainToCheck })
      console.log(getDomainResult)
      if (!getDomainResult.name_hash) {
        throw new Error('no name hash')
      }
      this.statusMessage = 'Got info, updating domain'
      const updateDomainResult = await this.$store.dispatch('updateDomain', { nameHash: getDomainResult.name_hash, pubKey: this.addressToPoint })
      console.log(updateDomainResult)
      this.statusMessage = 'Waiting for update to be mined'
      await this.$store.dispatch('waitForTransaction', { txHash: updateDomainResult['tx_hash'] })
      this.statusMessage = 'All Done'
      console.log('done')
      this.claimInProcess = false
    }
  },
  mounted () {
    if (this.activeIdentity.address) {
      this.addressToPoint = this.activeIdentity.address
    }
  }
}
</script>

<style lang="css" scoped>
.aens {

}
</style>

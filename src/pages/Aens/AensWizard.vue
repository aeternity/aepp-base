<template>
  <modal-screen class="aens-wizard" :title="title" :redirectToOnClose="{ name: 'aens-list' }">
    <div v-if="!domain">
      <ae-input placeholder="yourdomain.aet" v-model="domainToCheck"></ae-input>
      <ae-button type='boring' @click="setDomain">Check</ae-button>
    </div>

    <div class="loading" v-if="loading">
      Loading
    </div>
    <div v-else>
      <div v-if="currentState === states.CLAIMED_AND_OWNED_ROUTED">
        claimed and owned by you and routed
        <ae-address :address="pointer" size="compact" :show-avatar="true"></ae-address>
        <ae-address-input
          :isBase58="true"
          name="addressToPoint"
          v-model="addressToPoint"
          v-validate="'required|min:97'"
          data-vv-delay="1">
        </ae-address-input>
        <ae-button type='boring' @click="startUpdate">Update</ae-button>
        <ae-button type='boring' @click="startRevoke">Revoke</ae-button>
        <ae-button type='boring' @click="startTransfer">Transfer</ae-button>
      </div>
      <div v-if="currentState === states.CLAIMED_AND_OWNED_NOT_ROUTED">
        claimed and owned by you and not pointing to any address
        <ae-address-input
          :isBase58="true"
          name="addressToPoint"
          v-model="addressToPoint"
          v-validate="'required|min:97'"
          data-vv-delay="1">
        </ae-address-input>
        <ae-button type='boring' @click="startUpdate">Point</ae-button>
      </div>
      <div v-else-if="currentState === states.CLAIMED_AND_NOT_OWNED">
        claimed and (maybe) not owned by you
      </div>
      <div v-else-if="currentState === states.START_PRECLAIM">
        This Domain seems available
        <ae-button type='boring' @click="startPreclaim">Preclaim</ae-button>
      </div>
      <div v-else-if="currentState === states.PRECLAIM_MINED">
        preclaim mined
        <ae-button type='boring' @click="startClaim">Claim</ae-button>
      </div>
      <div v-else-if="currentState === states.WAITING_FOR_PRECLAIM">
        waiting for preclaim
      </div>
      <div v-else-if="currentState === states.CLAIM_MINED">
        claim mined
      </div>
      <div v-else-if="currentState === states.WAITING_FOR_CLAIM">
        waiting for claim
      </div>
      <div v-else-if="currentState === states.WAITING_FOR_UPDATE">
        waiting for update
      </div>
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
  name: 'aens-wizard',
  data () {
    return {
      loading: false,
      domainToCheck: null,
      states: {
        CLAIMED_AND_OWNED_ROUTED: 'claimedAndOwnedRouted',
        CLAIMED_AND_OWNED_NOT_ROUTED: 'claimedAndOwnedNotRouted',
        CLAIMED_AND_NOT_OWNED: 'claimedAndNotOwned',
        START_PRECLAIM: 'startPreclaim',
        CLAIM_MINED: 'claimMined',
        WAITING_FOR_CLAIM: 'waitingForClaim',
        PRECLAIM_MINED: 'preclaimMined',
        WAITING_FOR_PRECLAIM: 'waitingForPreclaim',
        WAITING_FOR_UPDATE: 'waitingForUpdate'
      },
      currentState: null,
      storageObj: null,
      apiData: null,
      addressToPoint: null
    }
  },
  computed: {
    ...mapGetters([
      'aeternityClient',
      'activeIdentity',
      'myDomains'
    ]),
    domain: {
      get () {
        return this.$route.params.domain
      },
      set (domain) {
        this.$router.replace({
          name: 'aens-wizard',
          params: {
            ...this.$route.params,
            domain
          }
        })
      }
    },
    title () {
      return this.domain ? this.domain : 'Claim'
    },
    pointer () {
      if (!this.apiData || !this.apiData.pointers) {
        return null
      }
      return this.apiData.pointers.account_pubkey || this.apiData.pointers.oracle_pubkey
    }
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
    setDomain () {
      this.domain = this.domainToCheck
    },
    async checkDomainState (domain) {
      this.loading = true
      // make api call, check if claimed
      const apiData = await this.aeternityClient.aens.getName(domain)
      if (apiData && apiData.pointers && typeof apiData.pointers === 'string') {
        apiData.pointers = JSON.parse(apiData.pointers)
      }
      this.apiData = apiData
      // also check if localstorage record is present
      const storageObj = this.myDomains.find(domainObj => domainObj.domain === domain)
      this.storageObj = storageObj
      // if claimed & localstorage => show possibly own domain
      if (apiData && storageObj && storageObj.updateTx && !(await this.isTxMined(storageObj.updateTx.tx_hash))) {
        // we have an unmined update tx
        this.currentState = this.states.WAITING_FOR_UPDATE
        this.reloadAfterTx(storageObj.updateTx.tx_hash)
      } else if (apiData && storageObj && apiData.pointers && (apiData.pointers.account_pubkey || apiData.pointers.oracle_pubkey)) {
        this.currentState = this.states.CLAIMED_AND_OWNED_ROUTED
      } else if (apiData && storageObj) {
        this.currentState = this.states.CLAIMED_AND_OWNED_NOT_ROUTED
      } else if (apiData &&
        // if claimed & !localstorage => show details and already registered
        (!apiData.pointers || (!apiData.pointers.account_pubkey && !apiData.pointers.oracle_pubkey)) &&
        !storageObj) {
        this.currentState = this.states.CLAIMED_AND_NOT_OWNED
      } else if (apiData && !storageObj) {
        this.currentState = this.states.CLAIMED_AND_NOT_OWNED
      } else if (!apiData && !storageObj) {
        // if not claimed & !localstorage => start pre-claim
        this.currentState = this.states.START_PRECLAIM
      } else if (!apiData && storageObj) {
        // if not claimed & localstorage => show depending on state of localstorage
        // we have a claim tx
        if (storageObj.claimTx) {
          if (await this.isTxMined(storageObj.claimTx.tx_hash)) {
            this.currentState = this.states.CLAIM_MINED
          } else {
            this.currentState = this.states.WAITING_FOR_CLAIM
            this.reloadAfterTx(storageObj.claimTx.tx_hash)
          }
        } else if (storageObj.preClaimTx && storageObj.salt) {
          // we have a pre-claim & a stored salt
          if (await this.isTxMined(storageObj.preClaimTx.tx_hash)) {
            this.currentState = this.states.PRECLAIM_MINED
          } else {
            this.currentState = this.states.WAITING_FOR_PRECLAIM
            this.reloadAfterTx(storageObj.preClaimTx.tx_hash)
          }
        }
      }

      this.loading = false
    },
    async isTxMined (txHash) {
      const transaction = await this.aeternityClient.tx.getTransaction(txHash)
      const blockHeight = transaction['block_height']
      return blockHeight !== -1
    },
    async reloadAfterTx (txHash) {
      await this.$store.dispatch('waitForTransaction', { txHash: txHash })
      this.checkDomainState(this.domain)
    },
    async startPreclaim () {
      const salt = Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER))
      const preClaimResult = await this.$store.dispatch('preClaimDomain', { domain: this.domain, salt: salt })
      const domainObj = {
        domain: this.domainToCheck,
        registrar: this.activeIdentity.address,
        salt: salt,
        state: 0,
        nameHash: null,
        preClaimTx: preClaimResult,
        claimTx: null,
        updateTx: null
      }
      this.$store.commit('addDomainItem', domainObj)
      this.checkDomainState(this.domain)
    },
    async startClaim () {
      const domainObj = this.storageObj
      const claimResult = await this.$store.dispatch('claimDomain', { domain: this.domain, salt: domainObj.salt })
      domainObj.claimTx = claimResult
      this.checkDomainState(this.domain)
    },
    async startUpdate () {
      const domainObj = this.storageObj
      const updateDomainResult = await this.$store.dispatch('updateDomain', { nameHash: this.apiData.name_hash, pubKey: this.addressToPoint })
      domainObj.updateTx = updateDomainResult
      this.checkDomainState(this.domain)
    },
    startRevoke () {
      alert('Not implemented ;)')
    },
    startTransfer () {
      alert('Not implemented ;)')
    }
  },
  mounted () {
    if (this.domain) {
      this.checkDomainState(this.domain)
    }
    if (this.activeIdentity.address) {
      this.addressToPoint = this.activeIdentity.address
    }
  },
  watch: {
    domain (newValue, oldValue) {
      this.checkDomainState(newValue)
    }
  }
}
</script>

<style lang="css" scoped>
.aens {

}
</style>

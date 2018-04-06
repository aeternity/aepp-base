<template>
  <div class="aens-entry">
    <div class="domain">
      Domain: {{domain.domain}}
    </div>
    <div class="state">
      State: {{readableState}}
    </div>
    <div class="pointer" v-if="pointer">
      <ae-address :address="pointer" size="compact" :show-avatar="true"></ae-address>
    </div>
    <div class="actions">
      <ae-button type='boring' :to="{name: 'aens-wizard', params: {domain: domain.domain}}">Wizard</ae-button>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import {
  AeButton,
  AeAddress
} from '@aeternity/aepp-components'

export default {
  name: 'aens-entry',
  props: ['domain'],
  data () {
    return {
      domainDetails: {}
    }
  },
  computed: {
    ...mapGetters([
      'aeternityClient'
    ]),
    readableState () {
      if (this.domainDetails && this.domainDetails.pointers && (this.domainDetails.pointers.account_pubkey || this.domainDetails.pointers.oracle_pubkey)) {
        return 'claimed and set'
      } else if (this.domainDetails && !this.domainDetails.pointers) {
        return 'claimed but not set'
      } else if (!this.domainDetails) {
        return 'claiming in progress'
      }
    },
    pointer () {
      if (!this.domainDetails || !this.domainDetails.pointers) {
        return null
      }
      return this.domainDetails.pointers.account_pubkey || this.domainDetails.pointers.oracle_pubkey
    }
  },
  components: {
    AeAddress,
    AeButton
  },
  methods: {
    async checkState () {
      const domainDetails = await this.aeternityClient.aens.getName(this.domain.domain)
      if (domainDetails && domainDetails.pointers && typeof domainDetails.pointers === 'string') {
        domainDetails.pointers = JSON.parse(domainDetails.pointers)
      }
      this.domainDetails = domainDetails
      // console.log(this.domainDetails)
    }
  },
  mounted () {
    this.checkState()
  }
}
</script>

<style lang="css" scoped>
.aens-entry {

}
</style>

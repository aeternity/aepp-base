<template>
  <div class="aens-entry">
    <h3 class="domain">
      {{domain.domain}}
    </h3>
    <div class="state">
      {{readableState}}
    </div>
    <div class="pointer" v-if="pointer">
      <ae-address :address="pointer" size="compact" :show-avatar="true"></ae-address>
    </div>
    <div class="actions">
      <ae-button type='exciting' size="small" :to="{name: 'aens-wizard', params: {domain: domain.domain}}">Details</ae-button>
    </div>
    <hr />
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
      if (this.domainDetails && this.pointer) {
        return 'claimed and set'
      } else if (this.domainDetails) {
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
.state {
  margin: 10px 0px;
}

.pointer {
  margin: 10px 0px;
}
</style>

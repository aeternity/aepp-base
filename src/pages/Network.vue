<template>
  <div class="network screen">
    <h1>Network</h1>
    <ae-switch
      name="example"
      v-if="ready"
      :choices="options"
      :default="current"
      @input="update"
    />
    <div class="status">
     <b>Network id:</b> {{nodeSettings.host}}<br />
    </div>
   <!--  <ae-button @click="addCustom = !addCustom"  :type="!addCustom ? 'exciting' : 'normal'">Add Custom Network</ae-button>
    <br>
    <form @submit.prevent="addOption()">
      <input v-if="addCustom" v-model="custom" placeholder="Custom Network" ref="input">
    </form> -->
    <quick-id showBackButton/>
  </div>
</template>


<script>
import { mapState } from 'vuex'
import {
  AeSwitch,
  AeButton,
  AeAmountInput
} from '@aeternity/aepp-components'
import QuickId from '@/components/QuickId.vue'

export default {
  name: 'network',
  data () {
    return {
      addCustom: false,
      custom: '',
      current: 0,
      ready: false,
      options: [
        {
          label: 'Devnet',
          value: 0,
          nodeSettings: {
            host: 'sdk-testnet.aepps.com',
            port: 443,
            secured: true
          }
        },
        {
          label: 'Localhost',
          value: 1,
          nodeSettings: {
            host: 'localhost',
            port: 3013,
            secured: false
          }
        }
      ]
    }
  },
  computed: {
    ...mapState([
      'nodeSettings'
    ])
  },
  methods: {
    update (newVal) {
      if (this.current === newVal) return
      this.current = newVal
      let option = this.options[this.current]
      console.log('should update to', option)
      this.$store.commit('setNodeSettings', option.nodeSettings)
    }
  },
  components: {
    AeSwitch,
    AeButton,
    AeAmountInput,
    QuickId
  },
  mounted () {
    // let url = this.$store.state.rpcUrl
    let host = this.nodeSettings.host
    let key = this.options.findIndex((option) => option.nodeSettings.host.toLowerCase() === host.toLowerCase())
    if (key > -1) {
      this.current = key
    }
    this.ready = true
  },
  destroyed () {
    this.ready = false
  }
}
</script>

<style lang="css" scoped>
.network button, .network input, .network h1 {
  margin:20px auto;
  display: block;
  text-align: center;
}
.network .status {
  margin: 20px auto;
  max-width: 600px;
}
</style>

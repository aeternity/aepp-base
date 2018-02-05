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
     <b>Network id:</b> {{networkId}}<br />
     <b>Token contract address:</b>
      {{tokenContract ? tokenContract.address : 'undefined'}}
    </div>
   <!--  <ae-button @click="addCustom = !addCustom"  :type="!addCustom ? 'exciting' : 'normal'">Add Custom Network</ae-button>
    <br>
    <form @submit.prevent="addOption()">
      <input v-if="addCustom" v-model="custom" placeholder="Custom Network" ref="input">
    </form> -->
    <router-link :to="{ name: 'apps' }" class="back" />
    <quick-id />
  </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex'
import {
  AeSwitch,
  AeButton,
  AeAmountInput
} from '@aeternity/aepp-components'
import QuickId from '@/components/QuickId/QuickId.vue'

export default {
  name: 'network',
  data () {
    return {
      addCustom: false,
      custom: '',
      current: 0,
      ready: false,
      options: [
        { label: 'Kovan', value: 0, url: 'https://kovan.infura.io' },
        { label: 'Rinkeby', value: 1, url: 'https://rinkeby.infura.io' },
        { label: 'Ropsten', value: 2, url: 'https://ropsten.infura.io' },
        { label: 'Localhost:8545', value: 3, url: 'http://localhost:8545' }
      ]
    }
  },
  computed: {
    ...mapState({
      networkId: state => state.networkId
    }),
    ...mapGetters(['tokenContract'])
  },
  methods: {
    addOption () {
      this.options.push({label: this.custom, value: this.options.length, url: this.custom})
    },
    update (newVal) {
      if (this.current === newVal) return
      this.current = newVal
      let option = this.options[this.current]
      this.$store.commit('updateRPC', option.url)
    }
  },
  components: {
    AeSwitch,
    AeButton,
    AeAmountInput,
    QuickId
  },
  mounted () {
    let url = this.$store.state.rpcUrl
    let key = this.options.findIndex((option) => option.url.toLowerCase() === url.toLowerCase())
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
.back {
  position:absolute;
  bottom:2px;
  left:5px;
  width:50px;
  height:50px;
  z-index:998;
  background-image: url('/static/icons/browser.svg');
  background-size: contain;
}
</style>

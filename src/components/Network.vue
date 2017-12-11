<template>
  <div class="network screen">
    <h1>Network</h1>
    <ae-switch
      name="example"
      :choices="options"
      :default="0"
      @input="update"
    /></ae-switch>
   <!--  <ae-button @click="addCustom = !addCustom"  :type="!addCustom ? 'exciting' : 'normal'">Add Custom Network</ae-button>
    <br>
    <form @submit.prevent="addOption()">
      <input v-if="addCustom" v-model="custom" placeholder="Custom Network" ref="input">
    </form> -->
  </div>
</template>


<script>
import {
  AeSwitch,
  AeButton,
  AeAmountInput
} from '@aeternity/aepp-components'

export default {

  name: 'Network',

  data () {
    return {
      addCustom: false,
      custom: '',
      current: 0,
      options: [
        { label: 'Kovan', value: 0, url: 'https://kovan.infura.io' },
        { label: 'Rinkeby', value: 1, url: 'https://rinkeby.infura.io' },
        { label: 'Ropsten', value: 2, url: 'https://ropsten.infura.io' },
        { label: 'Localhost', value: 3, url: 'http://localhost:8545' },
        { label: 'Mainnet', value: 4, url: 'https://mainnet.infura.io' }
      ]
    }
  },
  watch: {
    current () {
      let option = this.options[this.current]
      this.$store.dispatch('updateRPC', option.url)
    }
  },
  methods: {
    addOption () {
      this.options.push({label: this.custom, value: this.options.length, url: this.custom})
    },
    update (newVal) {
      console.log(newVal)
      this.current = newVal
    }
  },
  components: {
    AeSwitch,
    AeButton,
    AeAmountInput
  },
  mounted () {
    console.log(this.$store)
  }
}
</script>

<style lang="css" scoped>
.network button, .network input, .network h1 {
  margin:20px auto;
  display: block;
  text-align: center;
}
</style>

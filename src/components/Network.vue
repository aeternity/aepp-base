<template>
  <div class="network screen">
    <h1>Network</h1>
    <ae-switch
      name="example"
      :choices="options"
      :default="0"
    /></ae-switch>
    <ae-button @click="addCustom = !addCustom"  :type="!addCustom ? 'exciting' : 'normal'">Add Custom Network</ae-button>
    <br>
    <ae-amount-input></ae-amount-input>
    <input v-if="addCustom" v-model="custom" placeholder="Custom Network" ref="input">
  </div>
</template>
</template>

<script>
import {
  AeSwitch,
  AeButton,
  AeAmountInput
} from '@aeternity/aepp-components'
import {mapActions} from '@/store'
export default {

  name: 'Network',

  data () {
    return {
      addCustom: false,
      custom: '',
      options: [
        { label: 'Kovan', value: 0, url: 'https://kovan.infura.io' },
        { label: 'Rinkeby', value: 1, url: 'https://rinkeby.infura.io' },
        { label: 'Ropsten', value: 2, url: 'https://ropsten.infura.io' },
        { label: 'Localhost', value: 3, url: 'http://localhost:8545' }
      ]
    }
  },
  methods: {
    addOptions (url) {
      options.push({label: url, value: this.options.length, url})
    }
  },
  components: {
    AeSwitch,
    AeButton,
    AeAmountInput
  }
}
</script>

<style lang="css" scoped>
</style>

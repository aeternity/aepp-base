import {AeAddress} from '@aeternity/aepp-components'
import unit from 'ethjs-unit'
export default {
  name: 'ae-transaction-summary',
  props: [
    'addressFrom',
    'addressTo',
    'amount',
    'amountInFiat',
    'gas'
  ],
  components: {
    AeAddress
  },
  filters: {
    fromWei (value) {
      return unit.fromWei(value, 'ether')
    }
  },
  computed: {
    amountInWei () {
      return unit.toWei(this.amount, 'ether')
    },
    total () {
      return this.gas.price
        .times(this.gas.amount)
        .plus(this.amountInWei)
        .toString()
    }
  }
}

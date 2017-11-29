import Bignumber from 'bignumber.js'
import Web from 'web3'
import {convertAE_USD, convertETH_USD} from '@/lib/currencyConverter'

const {fromWei} = Web.prototype

import {
  AeModal,
  AeHeaderButton,
  AeAmount,
  AeButton,
  AeAppIcon,
  AeIcon,
  AeIdentityAvatar
} from '@aeternity/aepp-components'

const _createValueStr = (value, decimal, currencySymbol = '$') => {
  if (typeof value !== 'number') {
    return ''
  }

  const rounded = parseFloat(value.toFixed(decimal))
  const start = rounded === value ? '' : '≈ '
  return `${start}${rounded} ${currencySymbol}`
}

export default {
  name: 'approve',
  data () {
    return {
      usdValue: undefined, usdGas: undefined, gasEstimate: undefined
    }
  },
  props: {
    appName: {
      type: String,
      default: ''
    },
    transaction: {
      type: Object
    },
    estimateGas: {
      type: Function,
      required: true
    },
    getGasPrice: {
      type: Function,
      required: true
    },
    isAeTokenTx: {
      type: Boolean,
      default: false
    },
    aeTokenTx: {
      type: Object,
      default: null
    }
  },
  components: {
    AeModal,
    AeHeaderButton,
    AeAmount,
    AeButton,
    AeAppIcon,
    AeIcon,
    AeIdentityAvatar
  },
  computed: {
    amount () {
      return fromWei(this.transaction.value, 'ether')
    },
    from () {
      return this.transaction.from
    },
    to () {
      return this.transaction.to
    },
    gas () {
      const gas = this.transaction.gas
      return gas ? fromWei(gas, 'ether') : ''
    },
    gasEstimateStr () {
      return _createValueStr(parseFloat(this.gasEstimate), 5, 'ETH')
    },
    gasPrice () {
      const gasPrice = this.transaction.gasPrice
      return gasPrice ? new Bignumber(gasPrice) : ''
    },
    nonce () {
      return this.transaction.nonce
    },
    tokenAmount () {
      if (this.isAeTokenTx && this.aeTokenTx && this.aeTokenTx.name && this.aeTokenTx.params) {
        let method = this.aeTokenTx.name
        if (method === 'approveAndCall' || method === 'approve' || method === 'transfer') {
          let value = this.aeTokenTx.params.find(param => param.name === '_value').value
          if (value) {
            return fromWei(value, 'ether')
          }
        }
      }
      return '0'
    },
    usdValueStr () {
      return _createValueStr(this.usdValue, 10)
    },
    usdGasStr () {
      return _createValueStr(this.usdGas, 5)
    }
  },
  methods: {
    reject () {
      this.$close(false)
    },
    accept () {
      this.$close(true)
    }
  },
  mounted () {
    const amount = this.amount
    convertAE_USD(amount).then(
      usdValue => { this.usdValue = usdValue }
    )

    Promise.all([
      this.estimateGas(),
      this.getGasPrice()
    ]).then(
      ([gasEstimate, gasPrice = 1]) => {
        const asWei = gasEstimate * gasPrice
        const ethVal = fromWei(asWei, 'ether')
        this.gasEstimate = ethVal
        return convertETH_USD(ethVal)
      }
    ).then(
      usdGas => { this.usdGas = usdGas }
    )
  }
}

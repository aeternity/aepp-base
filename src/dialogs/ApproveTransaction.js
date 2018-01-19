import Bignumber from 'bignumber.js'
import Web from 'web3'
import {convertAEtoCHF, convertETHtoCHF} from '@/lib/currencyConverter'
import ApproveButtons from '@/dialogs/ApproveButtons.vue'
import DialogHeader from '@/dialogs/DialogHeader.vue'

const {fromWei} = Web.prototype

import {
  AeModal,
  AeHeaderButton,
  AeAmount,
  AeIcon,
  AeIdentityAvatar
} from '@aeternity/aepp-components'

const _createValueStr = (value, decimal, currencySymbol = 'CHF') => {
  if (typeof value !== 'number') {
    return ''
  }

  const rounded = parseFloat(value.toFixed(decimal))
  const start = rounded === value ? '' : '≈ '
  return `${start}${rounded} ${currencySymbol}`
}

export default {
  name: 'approve-transaction',
  data () {
    return {
      fiatValue: undefined, fiatGas: undefined, gasEstimate: undefined // all set in mounted() through async functions.
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
    AeIdentityAvatar,
    AeIcon,
    ApproveButtons,
    DialogHeader
  },
  computed: {
    amount () {
      const isAeTokenTx = this.isAeTokenTx
      return isAeTokenTx ? this.tokenAmount : parseFloat(fromWei(this.transaction.value, 'ether'))
    },
    from () {
      return this.transaction.from
    },
    to () {
      return this.isAeTokenTx ? this.aeDestination : this.transaction.to
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
    aeDestination () {
      if (this.isAeTokenTx && this.aeTokenTx && this.aeTokenTx.name && this.aeTokenTx.params) {
        let method = this.aeTokenTx.name
        if (method === 'approveAndCall' || method === 'approve' || method === 'transfer') {
          let param = this.aeTokenTx.params.find(param => param.name === '_to')
          if (!param) {
            param = this.aeTokenTx.params.find(param => param.name === '_spender')
          }
          if (param && param.value) {
            return param.value
          }
          return ''
        }
      }

      return this.transaction.to
    },
    fiatValueStr () {
      return _createValueStr(this.fiatValue, 10)
    },
    fiatGasStr () {
      return _createValueStr(this.fiatGas, 5)
    },
    unit () {
      return this.isAeTokenTx ? 'Æ' : 'eth'
    }
  },
  methods: {
    reject () {
      this.$close(false)
    },
    approve () {
      this.$close(true)
    }
  },
  mounted () {
    const amount = this.amount
    const toFiat = this.isAeTokenTx ? convertAEtoCHF : convertETHtoCHF
    toFiat(amount).then(
      fiatValue => { this.fiatValue = fiatValue }
    )

    Promise.all([
      this.estimateGas(),
      this.getGasPrice()
    ]).then(
      ([gasEstimate, gasPrice]) => {
        const asWei = gasEstimate * gasPrice
        const ethVal = fromWei(asWei, 'ether')
        this.gasEstimate = ethVal
        return convertETHtoCHF(ethVal)
      }
    ).then(
      fiatGas => { this.fiatGas = fiatGas }
    )
  }
}

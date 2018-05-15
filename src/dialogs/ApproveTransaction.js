import Bignumber from 'bignumber.js'
import Web3 from 'web3'
import { convertAEtoCHF, convertETHtoCHF } from '@/lib/currencyConverter'
import ApproveButtons from '@/dialogs/ApproveButtons.vue'
import DialogHeader from '@/dialogs/DialogHeader.vue'
import {
  AeModal,
  AeHeaderButton,
  AeAmount,
  AeIcon,
  AeIdentityAvatar
} from '@aeternity/aepp-components'

const { fromWei } = (new Web3()).utils

const createValueStr = (value, decimal, currencySymbol = 'CHF') => {
  if (typeof value !== 'number' || isNaN(value)) {
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
      aePrice: NaN,
      ethPrice: NaN
    }
  },
  props: {
    appName: {
      type: String,
      default: ''
    },
    transaction: Object,
    aeTokenTx: Object,
    resolve: {
      type: Function,
      required: true
    },
    reject: {
      type: Function,
      required: true
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
      if (this.aeTokenTx && this.aeTokenTx.params) {
        if (['approveAndCall', 'approve', 'transfer'].includes(this.aeTokenTx.name)) {
          const { value } = this.aeTokenTx.params.find(param => param.name === '_value')
          if (value) {
            return parseFloat(fromWei(value, 'ether'))
          }
        }
      }
      if (this.transaction.value) {
        return parseFloat(fromWei(this.transaction.value, 'ether'))
      }
      return 0
    },
    amountFiat () {
      return createValueStr((this.aeTokenTx ? this.aePrice : this.ethPrice) * this.amount, 10)
    },
    to () {
      if (this.aeTokenTx && this.aeTokenTx.params) {
        if (['approveAndCall', 'approve', 'transfer'].includes(this.aeTokenTx.name)) {
          const param = this.aeTokenTx.params.find(param => param.name === '_to') ||
            this.aeTokenTx.params.find(param => param.name === '_spender')
          if (param && param.value) {
            return param.value
          }
          return ''
        }
      }
      return this.transaction.to
    },
    fees () {
      const { gas, gasPrice } = this.transaction
      console.log('fees', gas, gasPrice)
      return fromWei(gas.toString(), 'ether') * new Bignumber(gasPrice)
    },
    feesStr () {
      return createValueStr(this.fees, 5, 'ETH')
    },
    feesFiat () {
      return createValueStr(this.ethPrice * this.fees, 5)
    },
    unit () {
      return this.aeTokenTx ? 'Æ' : 'eth'
    }
  },
  methods: {
    close () {
      this.reject(new Error('Payment rejected by user'))
      this.$store.commit('setTransactionToApprove')
    },
    approve () {
      this.resolve()
      this.$store.commit('setTransactionToApprove')
    }
  },
  async mounted () {
    const [aePrice, ethPrice] = await Promise.all([convertAEtoCHF(), convertETHtoCHF()])
    this.aePrice = aePrice
    this.ethPrice = ethPrice
  }
}

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
    transaction: Object
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
      if (this.transaction.amount) {
        return this.transaction.amount
      }
      return 0
    },
    amountFiat () {
      return createValueStr(this.aePrice * this.amount, 10)
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
      return this.transaction.gas
    },
    feesStr () {
      return createValueStr(this.fees, 5, 'Æ')
    },
    feesFiat () {
      return createValueStr(this.aePrice * this.fees, 5)
    },
    unit () {
      return 'Æ'
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
  async mounted () {
    const [aePrice, ethPrice] = await Promise.all([convertAEtoCHF(), convertETHtoCHF()])
    this.aePrice = aePrice
    this.ethPrice = ethPrice
  }
}

import { mapGetters, mapState } from 'vuex'
import {
  AeButton,
  AeSwitch,
  AeAddressInput,
  AeAmountInput,
  AeIdentity,
  AeLabel
} from '@aeternity/aepp-components'
import { swiper as Swiper, swiperSlide as SwiperSlide } from 'vue-awesome-swiper'
import { convertAEtoCHF, convertETHtoCHF } from '@/lib/currencyConverter'
import ModalScreen from '@/components/ModalScreen'

export default {
  name: 'transfer',
  components: {
    ModalScreen,
    AeIdentity,
    AeButton,
    AeSwitch,
    AeAddressInput,
    AeAmountInput,
    AeLabel,
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      transactionType: undefined,
      prices: {}
    }
  },
  computed: {
    ...mapGetters(['web3', 'tokenContract', 'identities', 'activeIdentity']),
    ...mapState({
      identitiesTo: (state, { identities, activeIdentity }) =>
        identities.filter(i => i.address !== activeIdentity.address),
      maxAmount ({ balances }, { web3, activeIdentity }) {
        const balance = balances[activeIdentity.address]
        const k = this.currency && this.currency.symbol === 'ETH' ? 'balance' : 'tokenBalance'
        return balance ? web3.utils.fromWei(balance[k], 'ether') : 0
      }
    }),
    to: {
      get () {
        return this.$route.params.to
      },
      set (to) {
        this.$router.replace({
          name: 'transfer',
          params: {
            ...this.$route.params,
            to
          }
        })
      }
    },
    currency: {
      get () {
        const { currency } = this.$route.params
        if (!currency) return undefined
        const [, amount, symbol] = /^(.*?)(\D*)$/.exec(currency)
        return { amount, symbol }
      },
      set (currency) {
        this.$router.replace({
          name: 'transfer',
          params: {
            ...this.$route.params,
            currency: `${currency.amount || 0}${currency.symbol}`
          }
        })
      }
    },
    fiatAmount () {
      const { amount, symbol } = this.currency || {}
      const fiatAmount = this.prices[symbol] * +amount
      return isNaN(fiatAmount) ? 'N/A' : fiatAmount.toFixed(2)
    },
    amount () {
      return this.currency ? this.currency.amount : 0
    },
    swiperOptionsTo () {
      const transfer = this
      function syncTo () {
        transfer.to = transfer.identitiesTo[this.activeIndex].address
      }
      return {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        initialSlide: this.identitiesTo.findIndex(i => i.address === this.to),
        on: {
          init: syncTo,
          slideChange: syncTo
        }
      }
    }
  },
  methods: {
    async send () {
      if (!await this.$validator.validateAll()) return

      const { amount, symbol } = this.currency || {}
      const { to } = this
      if (!to || !amount || !symbol) return
      const from = this.activeIdentity.address

      let tx
      switch (symbol) {
        case 'ETH':
          tx = {
            from,
            to,
            value: this.web3.utils.toWei(amount, 'ether')
          }
          break
        case 'AE':
          tx = {
            from,
            to: this.tokenContract._address,
            data: this.tokenContract.methods.transfer(
              to,
              this.web3.utils.toWei(amount, 'ether')
            ).encodeABI()
          }
          break
        default:
          throw new Error(`"${symbol}" is invalid transaction currency`)
      }

      const signedTx = await this.$store.dispatch('signTransaction', { tx, appName: 'Transfer' })
      await this.web3.eth.sendSignedTransaction(`0x${signedTx}`)
    }
  },
  async mounted () {
    this.$store.dispatch('updateAllBalances')
    const [aePrice, ethPrice] = await Promise.all([convertAEtoCHF(), convertETHtoCHF()])
    this.prices.AE = aePrice
    this.prices.ETH = ethPrice
  }
}

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
import QuickId from '@/components/QuickId/QuickId.vue'

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
    SwiperSlide,
    QuickId
  },
  data () {
    return {
      swiperOptionsTo: {
        autoplay: false,
        direction: 'horizontal',
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
        pagination: '.swiper-pagination',
        paginationClickable: true,
        initialSlide: 0,
        onSlideChangeEnd: swiper => {
          this.swiperOptionsTo.initialSlide = swiper.realIndex
        }
      },
      transactionType: undefined,
      addressTo: undefined,
      currency: undefined,
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
    fiatAmount () {
      const { amount, symbol } = this.currency || {}
      const fiatAmount = this.prices[symbol] * +amount
      return isNaN(fiatAmount) ? 'N/A' : fiatAmount.toFixed(2)
    },
    amount () {
      return this.currency ? this.currency.amount : 0
    }
  },
  methods: {
    async send () {
      if (!await this.$validator.validateAll()) return

      const { amount, symbol } = this.currency || {}
      const to = this.transactionType === 'internal'
        ? this.identitiesTo[this.swiperOptionsTo.initialSlide].address
        : this.addressTo
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

      await this.$store.dispatch('signTransaction', { tx, appName: 'Transfer' })
      await this.web3.eth.sendTransaction(tx)
    }
  },
  async mounted () {
    this.$store.dispatch('updateAllBalances')
    const [aePrice, ethPrice] = await Promise.all([convertAEtoCHF(), convertETHtoCHF()])
    this.prices.AE = aePrice
    this.prices.ETH = ethPrice
  }
}

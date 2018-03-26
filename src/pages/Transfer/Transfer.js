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
import QuickId from '@/components/QuickId.vue'
import unit from 'ethjs-unit'

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
      transactionType: undefined,
      prices: {},
      units: [
        { symbol: 'AE', name: 'æternity' }
      ]
    }
  },
  computed: {
    ...mapGetters(['identities', 'activeIdentity']),
    ...mapState({
      identitiesTo: (state, { identities, activeIdentity }) =>
        identities.filter(i => i.address !== activeIdentity.address),
      maxAmount ({ balances }, { activeIdentity }) {
        const balance = balances[activeIdentity.address]
        const k = this.currency && this.currency.symbol === 'ETH' ? 'balance' : 'tokenBalance'
        return balance ? unit.fromWei(balance[k], 'ether') : 0
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
      return {
        autoplay: false,
        direction: 'horizontal',
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
        pagination: '.swiper-pagination',
        paginationClickable: true,
        initialSlide: this.identitiesTo.findIndex(i => i.address === this.to),
        onSlideChangeEnd: swiper => {
          this.to = this.identitiesTo[swiper.realIndex].address
        },
        onInit: swiper => {
          this.to = this.identitiesTo[swiper.realIndex].address
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

      const spendTx = {
        from: from,
        to: to,
        amount: parseInt(amount)
      }
      // return await this.aeternityClient.base.spend(receiver, parseInt(amount), 1, options)
      const spendResult = await this.$store.dispatch('spendTransaction', { tx: spendTx, appName: 'Transfer' })
      console.log('spendResult', spendResult)
      // await this.$store.dispatch('signTransaction', { tx, appName: 'Transfer' })
      // await this.web3.eth.sendTransaction(tx)
    }
  },
  async mounted () {
    this.$store.dispatch('updateAllBalances')
    const [aePrice, ethPrice] = await Promise.all([convertAEtoCHF(), convertETHtoCHF()])
    this.prices.AE = aePrice
    this.prices.ETH = ethPrice
  }
}

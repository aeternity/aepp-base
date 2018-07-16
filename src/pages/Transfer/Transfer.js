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
import { convertAEtoCHF } from '../../lib/currencyConverter'
import MobilePage from '../../components/MobilePage'

export default {
  name: 'transfer',
  components: {
    MobilePage,
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
      aePrice: undefined
    }
  },
  computed: {
    ...mapGetters(['identities', 'activeIdentity']),
    ...mapState({
      epoch: ({ epoch }) => epoch,
      identitiesTo: (state, { identities, activeIdentity }) =>
        identities.filter(i => i.address !== activeIdentity.address),
      maxAmount: ({ balances }, { activeIdentity }) =>
        activeIdentity ? balances[activeIdentity.address] : 0
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
    amount: {
      get () {
        return this.$route.params.amount
      },
      set (amount) {
        this.$router.replace({
          name: 'transfer',
          params: {
            ...this.$route.params,
            amount
          }
        })
      }
    },
    fiatAmount () {
      const fiatAmount = this.aePrice * +this.amount
      return isNaN(fiatAmount) ? 'N/A' : fiatAmount.toFixed(2)
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

      const { to, amount } = this
      if (!to || !amount) return

      const signedTx = await this.$store.dispatch('signTransaction', {
        transaction: {
          fee: 1,
          amount: Math.floor(amount),
          sender: this.activeIdentity.address,
          recipientPubkey: to,
          payload: '',
          ttl: Number.MAX_SAFE_INTEGER
        },
        appName: 'Transfer'
      })
      await this.epoch.api.postTx({ tx: signedTx })
    }
  },
  async mounted () {
    this.$store.dispatch('updateAllBalances')
    this.aePrice = await convertAEtoCHF()
  }
}

import {
  AeButton,
  AeIcon,
  AeSwitch,
  AeAmountInput as AeAmount,
  AeIdentity,
  AeAddressInput
} from '@aeternity/aepp-components'
import AeTransaction from './aeTransaction/aeTransaction.vue'
import {swiper as Swiper, swiperSlide as SwiperSlide} from 'vue-awesome-swiper'
import {convertAE_CHF, convertETH_CHF} from '@/lib/currencyConverter'

import Web3 from 'web3'
import ZeroClientProvider from 'web3-provider-engine/zero'

let web3

const commonSwiperOptions = {
  autoplay: false,
  // grabCursor: true,
  // setWrapperSize: false,
  // autoHeight: false,
  // mousewheelControl: true,
  // observeParents: true,
  // debugger: true,
  direction: 'horizontal',
  // spaceBetween: 10,
  // slidesPerView: 3,
  // centeredSlides: true,
  spaceBetween: 10,
  centeredSlides: true,
  slidesPerView: 'auto',
  // roundLengths: true,
  pagination: '.swiper-pagination',
  paginationClickable: true
}

export default {
  name: 'Transfer',
  components: {
    AeIdentity,
    AeButton,
    AeIcon,
    AeSwitch,
    AeAmount,
    AeTransaction,
    AeAddressInput,
    Swiper,
    SwiperSlide
  },
  filters: {
    fromWei (value) {
      if (!web3) return ''
      return web3.fromWei(value)
    }
  },
  data () {
    return {
      notNextTick: true,
      swiperOptionsTo: {
        ...commonSwiperOptions,
        onSlideChangeEnd: swiper => {
          // console.log(swiper.activeIndex, swiper.realIndex, swiper)
          this.addressTo = this.identitiesTo[swiper.realIndex].address
        }
      },
      transactionType: 'internal',
      transactionCurrency: 'AE',
      addressTo: null,
      addressFrom: '',
      amount: 0.0001,
      fiatAmount: 'N/A',
      gas: null,
      web3Ready: false,
      transactionHash: null,
      transaction: null
    }
  },
  computed: {
    tokenAddress () {
      return this.$store.state.token.address
    },
    identities () {
      return this.$store.getters.identities
    },
    identitiesTo () {
      return this.identities.filter((i) => {
        return i.address !== this.addressFrom
      })
    },
    hasErrors () {
      const errors = this.errors || {}
      return typeof errors.length === 'number' && errors.length > 1
    },
    activeIdentity () {
      return this.$store.getters.activeIdentity
    },
    errors () {
      let errors = []
      if (!this.web3Ready) {
        errors.push('Web 3 not ready')
        return errors
      }
      if (!web3.isAddress(this.addressFrom)) {
        errors.push('Address From is invalid')
      }
      if (!web3.isAddress(this.addressTo)) {
        errors.push('Address To is invalid')
      }
      if (web3.isAddress(this.addressFrom) && this.addressFrom === this.addressTo) {
        errors.push('Addresses must be different')
      }
      if (parseFloat(this.amount) <= 0.0) {
        errors.push('Amount must be greater than zero')
      }
      return errors
    },
    allInputValid () {
      return this.errors.length < 1
    }
  },
  watch: {
    transactionType (newTransactionType) {
      if (newTransactionType !== 'internal') {
        return
      }
      if (this.$refs.swiperTo) {
        // alert(newTransactionType)
        this.addressTo = this.identitiesTo[this.$refs.swiperTo.swiper.realIndex].address
      }
    },
    amount () {
      this.recalculateFiat()
    },
    transactionCurrency (newCurrency) {
      this.recalculateFiat()
    }
  },
  methods: {
    async recalculateFiat () {
      try {
        if (this.transactionCurrency === 'AE') {
          let fiatAmount = await convertAE_CHF(this.amount)
          this.fiatAmount = parseFloat(fiatAmount).toFixed(2)
        } else {
          let fiatAmount = await convertETH_CHF(this.amount)
          this.fiatAmount = parseFloat(fiatAmount).toFixed(2)
        }
      } catch (e) {
        console.log(e)
        this.fiatAmount = 'N/A'
      }
    },
    close () {
      window.history.back()
    },
    isActive (id) {
      return id.address === this.activeIdentity.address
    },
    createWeb3 () {
      let providerOptsForApps = {
        getAccounts: (cb) => {
          cb(null, [this.activeIdentity.address])
        },
        signTransaction: async (tx, cb) => {
          try {
            let signed = await this.$store.dispatch('signTransaction', {tx, appName: 'Transfer'})
            cb(null, '0x' + signed)
          } catch (e) {
            /* handle error */
            cb(e, null)
          }
        },
        approveTransaction: (tx, cb) => {
          cb(null, true)
        },
        rpcUrl: this.$store.state.rpcUrl
      }
      web3 = new Web3(new ZeroClientProvider(providerOptsForApps))
      if (web3) {
        this.web3Ready = true
      }
    },
    estimateGas () {
      var tx = {
        from: this.addressFrom,
        to: this.addressTo,
        value: web3.toWei(this.amount, 'ether')
      }
      let gasAmount = new Promise((resolve, reject) => {
        web3.eth.estimateGas(tx, (err, gas) => {
          if (err) {
            reject(err)
            return
          }
          resolve(gas)
        })
      })
      let gasPrice = new Promise((resolve, reject) => {
        web3.eth.getGasPrice((err, gasPrice) => {
          if (err) {
            reject(err)
            return
          }
          resolve(gasPrice)
        })
      })
      Promise.all([gasAmount, gasPrice]).then((values) => {
        this.gas = {
          amount: values[0],
          price: values[1],
          total: values[1].times(values[0]).toString()
        }
      })
    },
    send () {
      if (!web3) {
        this.createWeb3()
      }
      if (!this.addressFrom) {
        return
      }
      if (!this.addressTo) {
        return
      }
      if (!this.amount) {
        return
      }
      var txPromise
      if (this.transactionCurrency === 'ETH') {
        txPromise = Promise.resolve({
          from: this.addressFrom,
          to: this.addressTo,
          value: web3.toWei(this.amount, 'ether')
        })
      } else if (this.transactionCurrency === 'AE') {
        txPromise = new Promise((resolve, reject) => {
          this.$store.dispatch('aeContract').then(contract => {
            let tx = {
              from: this.addressFrom,
              to: this.tokenAddress,
              value: 0,
              data: contract.transfer.getData(this.addressTo, web3.toWei(this.amount, 'ether'))
            }
            resolve(tx)
          }).catch(() => {
            reject(new Error('aeContract not found'))
          })
        })
      } else {
        return
      }

      txPromise.then(tx => {
        web3.eth.sendTransaction(tx, (err, transactionHash) => {
          if (err) {
            alert(err.message)
            return
          }
          this.transactionHash = transactionHash
          this.$router.replace({path: `/transfer/${transactionHash}`})
        })
      })
    },
    parseQueryData () {
      var queryData = this.$route.query
      if (queryData) {
        if (queryData.to && web3.isAddress(queryData.to)) {
          this.addressTo = queryData.to
          this.transactionType = 'external'
        }
        if (queryData.currency) {
          if (queryData.currency.toLowerCase() === 'ae') {
            this.transactionCurrency = 'AE'
          } else if (queryData.currency.toLowerCase() === 'eth') {
            this.transactionCurrency = 'ETH'
          }
        }
        if (queryData.amount) {
          let amount = parseFloat(queryData.amount)
          if (!isNaN(amount)) {
            this.amount = amount
          }
        }
      }
    }
  },
  created () {
    this.createWeb3()
    this.parseQueryData()
  },
  mounted () {
    this.addressFrom = this.activeIdentity.address
    if (!this.addressTo && this.identitiesTo.length > 0) {
      this.addressTo = this.identitiesTo[0].address
    }
    this.recalculateFiat()
    if (this.$route.params.txhash) {
      this.transactionHash = this.$route.params.txhash
    }
    this.$watch(vm => [vm.addressFrom, vm.addressTo, vm.amount].join(), val => {
      this.estimateGas()
    })
    this.estimateGas()
  }
}

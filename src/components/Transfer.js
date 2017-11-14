import aeButton from './aeButton/aeButton.vue'
import aeIdentity from './aeIdentity/aeIdentity.vue'
import aeTransaction from './aeTransaction/aeTransaction.vue'

import Transaction from 'ethereumjs-tx'
import { swiper as Swiper, swiperSlide as SwiperSlide } from 'vue-awesome-swiper'

import Web3 from 'web3'
import ZeroClientProvider from 'web3-provider-engine/zero'

import aeSwitch from './aeSwitch/aeSwitch.vue'

let web3

const commonSwiperOptions = {
  autoplay: false,
  //grabCursor: true,
  //setWrapperSize: false,
  //autoHeight: false,
  //mousewheelControl: true,
  //observeParents: true,
  //debugger: true,
  direction: 'horizontal',
  //spaceBetween: 10,
  //slidesPerView: 3,
  //centeredSlides: true,
  spaceBetween: 10,
  centeredSlides: true,
  slidesPerView: 'auto',
  //roundLengths: true,
  pagination: '.swiper-pagination',
  paginationClickable :true,
}

export default {
  name : 'Transfer',
  components: {
    'ae-identity': aeIdentity,
    'ae-button': aeButton,
    'ae-switch': aeSwitch,
    'ae-transaction' : aeTransaction,
    'swiper': Swiper,
    'swiper-slide': SwiperSlide,
    //'ae-button-icon': aeButtonIcon,
  },
  filters: {
    fromWei(value) {
      if (!web3) return ''
      return web3.fromWei(value)
    }
  },
  data() {
    return {
      notNextTick: true,
      swiperOptionsFrom: {
        ...commonSwiperOptions,
        onSlideChangeEnd: swiper => {
          console.log(swiper.activeIndex,swiper.realIndex,swiper)
          this.addressFrom = this.identities[swiper.realIndex].address
          if( this.$refs.swiperTo) {
            this.addressTo = this.identitiesTo[this.$refs.swiperTo.swiper.realIndex].address
          }
        }
      },
      swiperOptionsTo: {
        ...commonSwiperOptions,
        onSlideChangeEnd: swiper => {
          console.log(swiper.activeIndex,swiper.realIndex,swiper)
          this.addressTo = this.identitiesTo[swiper.realIndex].address
        }
      },
      transactionType : 'internal',
      exchange : null,
      addressTo : '0xFcd59f0258E024Fd11909c0902Fd51705F385a38',
      addressFrom : '',
      amount : '0.0001',
      gas : null,
      web3Ready : false,
      transactionHash : null,
      transaction : null
    }
  },
  computed : {
    identities () {
      return this.$store.getters.identities
    },
    identitiesTo () {
      return this.identities.filter((i) => {return i.address !== this.addressFrom})
    },
    total() {
      return this.gas.gasPrice.times(this.gas.gas).plus(web3.toWei(this.amount, 'ether')).toString()
    },
    amountInFiat() {
      if(!this.exchange) {
        return 'N/A'
      }
      return Math.round( this.exchange.USD * this.amount * 100) / 100

    },
    activeIdentity() {
      return this.$store.getters.activeIdentity
    },
    errors() {
      let errors = [];
      if(!this.web3Ready) {
        errors.push("Web 3 not ready")
        return errors
      }
      if(!web3.isAddress(this.addressFrom))
        errors.push("Address From is invalid")
      if(!web3.isAddress(this.addressTo))
        errors.push("Address To is invalid")
      if(web3.isAddress(this.addressFrom) && this.addressFrom === this.addressTo)
        errors.push("Addresses must be different")
      if(parseFloat(this.amount) <= 0.0)
        errors.push("Amount must be greater than zero")
      //if(address
      return errors
    },
    allInputValid() {
      return this.errors.length < 1
    },
  },
  watch : {
    transactionType (newTransactionType) {
      if(newTransactionType !== 'internal') {
        return
      }
      if( this.$refs.swiperTo ) {
        alert(newTransactionType)
        this.addressTo = this.identitiesTo[this.$refs.swiperTo.swiper.realIndex].address
      }
    }
  },
  methods : {
    isActive (id) {
      return id.address === this.activeIdentity.address
    },
    createWeb3() {
      let providerOptsForApps = {
        getAccounts: (cb) => {
          console.log('getAccounts');
          cb(null, [this.activeIdentity.address])
        },
        signTransaction: (tx, cb) => {
          this.$store.dispatch('signTransaction', {
            tx : tx,
            success : (signed) => {
              cb(null, '0x' + signed)
            }
          })
        },
        approveTransaction: (tx, cb) => {
          console.log('approve', tx)
          cb(null, true)
        },
        rpcUrl: this.$store.state.rpcUrl
      }
      web3 = new Web3(new ZeroClientProvider(providerOptsForApps))
      if(web3) {
        this.web3Ready = true;
      }
    },
    estimateGas() {
      var tx = {
        from : this.addressFrom,
        to : this.addressTo,
        value : web3.toWei(this.amount, "ether")
      }
      let gas = new Promise((resolve, reject) => {
        web3.eth.estimateGas(tx, (err, gas) => {
          if (err) {
            reject(err)
            return
          }
          resolve(gas)
        });
      })
      let gasPrice = new Promise((resolve, reject) => {
        web3.eth.getGasPrice((err,gasPrice)=>{
          if (err) {
            reject(err)
            return
          }
          resolve(gasPrice)
        })
      })
      Promise.all([gas,gasPrice]).then((values)=> {
        this.gas = {
          gas : values[0],
          gasPrice : values[1],
          total : values[1].times( values[0] ).toString()
        }
      })


    },
    send() {
      if(!web3) {
        this.createWeb3()
      }
      if(!this.addressFrom) {
        return
      }
      if(!this.addressTo) {
        return
      }
      if(!this.amount) {
        return
      }
      console.log('2 send', this.amount);
      var tx = {
        from : this.addressFrom,
        to : this.addressTo,
        value : web3.toWei(this.amount, "ether")
      }

      console.log('3 send', this.amount);
      console.log(tx)
      web3.eth.sendTransaction(tx, (err, transactionHash) => {
        console.log('4 send');
        if (err) {
          console.log(err)
          return
        }
        this.transactionHash = transactionHash
        this.$router.replace({ path: `/transfer/${transactionHash}` })
      });
    },
    swipeTo(idx) {
      this.$refs.swiperFrom.swiper.slideTo(idx)
    }
  },
  mounted() {
    console.log('mount')
    this.createWeb3()
    this.addressFrom = this.activeIdentity.address
    this.swipeTo(this.$store.state.selectedIdentityIdx)
    if(this.$route.params.txhash) {
      this.transactionHash = this.$route.params.txhash;
      //web3.eth.getTransaction(this.transactionHash, (err, tx) => {
        //this.transaction = tx;
        //if(!tx.blockHash) {
          //var checkTxInterval = setInterval(() => {
            //web3.eth.getTransaction(transactionHash, (err, tx) => {
              //this.transaction = tx;
              //if(tx.blockHash) {
                //clearInterval(checkTxInterval)
              //}
              //console.log(tx);
            //})
          //},1000)
        //}
        //console.log(tx);
      //})
    }
    const url = "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR"
    this.$watch(vm => [vm.addressFrom, vm.addressTo, vm.amount].join(), val => {
      this.estimateGas()
    })
    this.estimateGas()
    fetch(url).then((response) => {
      var contentType = response.headers.get("content-type");
      if(contentType && contentType.includes("application/json")) {
        return response.json();
      }
      throw new TypeError("Oops, we haven't got JSON!");
    }).then((json) => {
      this.exchange = json;
    })
  }
}

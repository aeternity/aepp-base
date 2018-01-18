import Web3 from 'web3'
import ZeroClientProvider from 'web3-provider-engine/zero'

let web3
export default {
  name: 'ae-transaction',
  props: [
    'txhash'
  ],
  data () {
    return {
      web3Ready: false,
      tx: null
    }
  },
  watch: {
    txhash (newTxhash) {
      this.fetchStatus()
    }
  },
  computed: {
    status () {
      if (!this.tx) { return 'Waiting...' }
      if (!this.tx.blockHash) { return 'Pending' }
      return `Mined in Block ${this.tx.blockNumber}`
    }
  },
  methods: {
    createWeb3 () {
      let providerOptsForApps = {
        getAccounts: (cb) => {
          cb(null, [])
        },
        signTransaction: (tx, cb) => {
          cb('Not supported', null)
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
    fetchStatus () {
      web3.eth.getTransaction(this.txhash, (err, tx) => {
        if (err) {
          console.log(err)
        }
        this.tx = tx
        if (!tx || !tx.blockHash) {
          var checkTxInterval = setInterval(() => {
            web3.eth.getTransaction(this.txhash, (err, tx) => {
              if (err) {
                console.log(err)
                clearInterval(checkTxInterval)
              }
              if (tx !== null) {
                this.tx = tx
                if (tx.blockHash) {
                  clearInterval(checkTxInterval)
                }
              }
            })
          }, 1000)
        }
      })
    }
  },
  mounted () {
    this.createWeb3()
    if (this.txhash) {
      this.fetchStatus()
    }
  }
}

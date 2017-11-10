import Transaction from 'ethereumjs-tx'
import Web3 from 'web3'
import ZeroClientProvider from 'web3-provider-engine/zero'

let web3

export default {
  name : 'Transfer',
  data() {
    return {
      addressTo : null,
      amount : null,
      transactionHash : null
    }
  },
  computed : {
    activeIdentity() {
      return this.$store.getters.activeIdentity
    }
  },
  methods : {
    createWeb3() {
      let providerOptsForApps = {
        getAccounts: function (cb) {
          console.log('getAccounts');
          cb(null, [this.activeIdentity.address])
        },
        signTransaction: function (tx, cb) {
          const t = new Transaction(tx)
          console.log('sign', tx, t)
          this.$store.dispatch('signTransaction', {
            t : t,
            success : (signed) => {
              cb(null, '0x' + signed)
            }
          })
          //var signed = lightwallet.signing.signTx(state.keystore, derivedKey, t.serialize().toString('hex'), tx.from)
        },
        approveTransaction: function (tx, cb) {
          console.log('approve', tx)
          cb(null, true)
        },
        rpcUrl: this.$store.state.rpcUrl
      }
      web3 = new Web3(new ZeroClientProvider(providerOptsForApps))
    },
    send() {
      console.log('1 send');
      if(!web3) {
        this.createWeb3()
      }
      console.log(web3);
      if(!this.addressTo) {
        return
      }
      if(!this.amount) {
        return
      }
      console.log('2 send', this.amount);
      var tx = {
        from : this.activeIdentity.address,
        to : this.addressTo,
        value : web3.toWei(this.amount, "ether")
      }
      console.log('3 send', this.amount);
      console.log(tx)
      web3.eth.sendTransaction(tx, function(err, transactionHash) {
        console.log('4 send');
        if (err) {
          console.log(err)
          return
        }
        this.transactionHash = transactionHash
        console.log(transactionHash); // "0x7f9fade1c0d57a7af66ab4ead7c2eb7b11a91385"
      });
    }
  },
  mounted() {
  }
}

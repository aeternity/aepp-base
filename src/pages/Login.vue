<template>
  <modal-screen title="Login to æternity" :redirectToOnClose="{ name: 'intro' }">
    <form @submit.prevent="unlockSavedKeystore">
      <ae-label
        :for="_uid"
        help-type="exciting"
        :help-text="errors.first('password')"
      >Enter your password</ae-label>
      <ae-input
        :id="_uid"
        name="password"
        type="password"
        v-model="password"
        v-validate="'required|min:4'"
        v-focus="true"
      />
      <ae-button
        type="exciting"
        :inactive="errors.any()"
      >Login</ae-button>
    </form>

    <div slot="footer">
      <p>
        Recover with phrase if you forgot your password or
        create a new account if you haven’t done that yet
      </p>
      <ae-button :to="{ name: 'recover' }" size="small" plain type="dramatic" uppercase>
        Recover with passphrase
      </ae-button>
      <ae-button :to="{ name: 'new-account' }" size="small" plain type="exciting" uppercase>
        Create new account
      </ae-button>
    </div>
  </modal-screen>
</template>

<script>
  import { AeLabel, AeInput, AeButton } from '@aeternity/aepp-components'
  import ModalScreen from '@/components/ModalScreen'
  import AeternityClient from '@aeternity/aepp-sdk'
  const HdWallet = AeternityClient.HdWallet
  import Crypto from '../lib/crypto'

  export default {
    components: { ModalScreen, AeInput, AeLabel, AeButton },
    data () {
      return { password: '' }
    },
    methods: {
      async unlockSavedKeystore () {
        if (!await this.$validator.validateAll()) return
        // const { keystore } = this.$store.getters
        // const derivedKey = await keystore.keyFromPasswordAsync(this.password)
        // if (!keystore.isDerivedKeyCorrect(derivedKey)) {
        //   this.$store.dispatch('setNotification', {
        //     text: 'You\'ve entered a wrong password',
        //     icon: require(`emoji-datasource-apple/img/apple/64/1f925.png`),
        //     autoClose: true
        //   })
        //   return
        // }
        const encMnemonic = this.$store.state.encMnemonic
        const mnemonic = Crypto.decryptString(encMnemonic, this.password)
        if (!mnemonic) {
          this.$store.dispatch('setNotification', {
            text: 'You\'ve entered a wrong password',
            icon: require(`emoji-datasource-apple/img/apple/64/1f925.png`),
            autoClose: true
          })
          return
        }
        // TODO: use existing action

        const hdWallet = await HdWallet.createHdWallet("m/44'/60'/0'/0", mnemonic, this.$store.getters.aeternityClient, this.$store.state.numAddresses)
        this.$store.commit('setHdWallet', hdWallet)
        // this.$store.commit('setDerivedKey', 'TODO:')
        this.$store.commit('setUnlocked', true)
      }
    }
  }
</script>

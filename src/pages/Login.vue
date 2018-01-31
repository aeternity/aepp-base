<template>
  <modal-screen title="Login to æternity" :redirectToOnClose="{ name: 'intro' }">
    <form @submit.prevent="unlockSavedKeystore">
      <ae-label
        :for="_uid"
        help-type="danger"
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
        :inactive="errors.has('password')"
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
  import { AeLabel, AeButton } from '@aeternity/aepp-components'
  import ModalScreen from '@/components/ModalScreen'
  import AeInput from '@/components/AeInput'

  export default {
    components: { ModalScreen, AeInput, AeLabel, AeButton },
    data () {
      return { password: '' }
    },
    methods: {
      async unlockSavedKeystore () {
        if (!await this.$validator.validateAll()) return
        const { keystore } = this.$store.state

        keystore.keyFromPassword(this.password, (err, derivedKey) => {
          if (err) return console.error(err)
          if (!keystore.isDerivedKeyCorrect(derivedKey)) {
            this.$store.dispatch('setNotification', {
              text: 'You\'ve entered a wrong password',
              icon: require(`emoji-datasource-apple/img/apple/64/1f925.png`),
              autoClose: true,
              hideCloseButton: true
            })
            return
          }
          this.$store.dispatch('initWeb3', derivedKey)
        })
      }
    }
  }
</script>

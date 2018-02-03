<template>
  <modal-screen title="New Account 2/2" :redirectToOnClose="{ name: 'intro' }">
    <form @submit.prevent="createKeystore">
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
      <p>
        Please choose a personal password to encrypt your new account.
      </p>
    </form>

    <div slot="footer">
      <ae-button
        type="dramatic"
        @click="createKeystore"
        :inactive="errors.has('password') || working"
      >
        Create Account
      </ae-button>
      <ae-button
        :to="{ name: accountExist && 'login' || recover && 'new-account' || 'recover' }"
        plain
        type="exciting"
        size="small"
        uppercase
      >
        {{accountExist && 'Login with an existing account'
          || recover && 'Create new account'
          || 'Recover with passphrase'}}
      </ae-button>
    </div>
  </modal-screen>
</template>

<script>
  import { mapState } from 'vuex'
  import { AeLabel, AeInput, AeButton } from '@aeternity/aepp-components'
  import ModalScreen from '@/components/ModalScreen'

  export default {
    components: { ModalScreen, AeInput, AeLabel, AeButton },
    data () {
      return {
        password: '',
        working: false,
        recover: false
      }
    },
    computed: mapState({
      accountExist: state => !!state.keystore
    }),
    methods: {
      async createKeystore () {
        if (!await this.$validator.validateAll()) return

        this.working = true
        try {
          await this.$store.dispatch('createKeystore', this.password)
          this.$store.dispatch('setNotification', {
            text: `You successfully ${this.recover ? 'recovered your' : 'created new'} account`,
            icon: require(`emoji-datasource-apple/img/apple/64/1f44f.png`),
            autoClose: true
          })
        } finally {
          this.working = false
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      next((vm) => {
        vm.recover = from.name === 'recover'
      })
    }
  }
</script>

<template>
  <mobile-page
    :redirect-to-on-close="{ name: recover ? 'recover' : 'new-account' }"
    class="set-password"
    title="New Account 2/2"
    back-button
  >
    <h1 class="title">Create a<br>password</h1>
    <span class="description">
      For easy daily access, please create a secure password
    </span>
    <form @submit.prevent="createKeystore">
      <ae-label
        :for="`${_uid}-password`"
        :help-text="errors.first('password')"
        help-type="dramatic"
      >Enter your password</ae-label>
      <ae-input
        v-validate="'required|min:4'"
        v-focus="true"
        :id="`${_uid}-password`"
        v-model="password"
        name="password"
        type="password"
      />
      <ae-label
        :for="`${_uid}-passwordRepeat`"
        :help-text="errors.first('passwordRepeat')"
        help-type="dramatic"
      >Confirm your password</ae-label>
      <ae-input
        v-validate="'confirmed:'+password"
        :id="`${_uid}-passwordRepeat`"
        name="passwordRepeat"
        type="password"
      />
    </form>

    <template slot="footer">
      <ae-button
        :inactive="errors.any() || working"
        type="dramatic"
        @click="createKeystore"
      >
        Create Account
      </ae-button>
      <ae-button
        :to="{ name: keystore && 'login' || recover && 'new-account' || 'recover' }"
        plain
        type="exciting"
        size="small"
        uppercase
      >
        {{ keystore && 'Login with an existing account'
          || recover && 'Create new account'
        || 'Recover with passphrase' }}
      </ae-button>
    </template>
  </mobile-page>
</template>

<script>
import { mapState } from 'vuex'
import { AeLabel, AeInput, AeButton } from '@aeternity/aepp-components'
import MobilePage from '../components/MobilePage'

export default {
  components: { MobilePage, AeInput, AeLabel, AeButton },
  data () {
    return {
      password: '',
      passwordRepeat: '',
      working: false,
      recover: false
    }
  },
  computed: mapState(['keystore']),
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
<style lang="scss" src="../components/MobilePageContent.scss" scoped />
<style lang="scss" scoped>
  .set-password {
    .title {
      font-size: 35px;
    }

    .description {
      font-size: 18px;
    }
  }
</style>

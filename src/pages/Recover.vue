<template>
  <mobile-page title="Recover with phrase" :redirectToOnClose="{ name: 'intro' }" close-button>
    <form @submit.prevent="setSeed">
      <ae-label
        :for="_uid"
        help-type="dramatic"
        :help-text="errors.first('seed')"
      >Enter passphrase</ae-label>
      <ae-textarea
        :id="_uid"
        name="seed"
        v-model="seed"
        v-validate="'required'"
        v-focus="true"
        monospace
      />
      <ae-button
        type="dramatic"
        :inactive="errors.any()"
      >Recover with Passphrase</ae-button>
    </form>

    <template slot="footer">
      <p>
        Enter your password if you remember it again or
        create a new account if you haven’t done that yet
      </p>
      <ae-button
        v-if="keystore"
        :to="{ name: 'login' }"
        size="small"
        plain
        type="exciting"
        uppercase
      >
        Login with an existing account
      </ae-button>
      <ae-button :to="{ name: 'new-account' }" size="small" plain type="exciting" uppercase>
        Create new account
      </ae-button>
    </template>
  </mobile-page>
</template>

<script>
import { mapState } from 'vuex'
import { AeLabel, AeTextarea, AeButton } from '@aeternity/aepp-components'
import MobilePage from '../components/MobilePage'

export default {
  components: { MobilePage, AeTextarea, AeLabel, AeButton },
  data () {
    return { seed: '' }
  },
  computed: mapState(['keystore']),
  methods: {
    async setSeed () {
      if (!await this.$validator.validateAll()) return

      try {
        this.$store.commit('setSeed', this.seed)
      } catch (e) {
        if (e.message !== 'Invalid mnemonic') throw e
        this.$store.dispatch('setNotification', {
          text: `Invalid passphrase`,
          autoClose: true
        })
      }
    }
  }
}
</script>
<style lang="scss" src="../components/MobilePageContent.scss" scoped />

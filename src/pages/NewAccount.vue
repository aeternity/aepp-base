<template>
  <mobile-page
    :redirect-to-on-close="{ name: 'intro' }"
    title="New Account 1/2"
    class="new-account"
    close-button
  >
    <div class="panel">
      <div class="passphrase">{{ seed }}</div>
      <ae-button
        plain
        size="small"
        uppercase
        @click="newSeed">
        <ae-icon
          slot="icon"
          name="refresh" />
        Generate new
      </ae-button>
    </div>
    <p>
      Save these 12 words to a safe place. You need them
      to recover your account in the future. Don't show them
      to anybody or you risk losing all your funds.
    </p>

    <template slot="footer">
      <ae-button
        type="exciting"
        @click="setSeed">
        Next
      </ae-button>
      <ae-button
        :to="{ name: keystore ? 'login' : 'recover' }"
        plain
        type="exciting"
        size="small"
        uppercase
      >
        {{ keystore ? 'Login with an existing account' : 'Recover with passphrase' }}
      </ae-button>
    </template>
  </mobile-page>
</template>

<script>
import { mapState } from 'vuex'
import { generateMnemonic } from '@aeternity/bip39'
import { AeLabel, AeButton, AeIcon } from '@aeternity/aepp-components'
import MobilePage from '../components/MobilePage'

export default {
  components: { MobilePage, AeLabel, AeButton, AeIcon },
  data () {
    return {
      seed: undefined
    }
  },
  computed: mapState(['keystore']),
  mounted () {
    this.newSeed()
  },
  methods: {
    newSeed () {
      this.seed = generateMnemonic()
    },
    setSeed () {
      this.$store.commit('setSeed', this.seed)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components/dist/variables.scss';

.new-account .panel {
  border-radius: 10px;
  background-color: #fff;
  max-width: 400px;
  margin: 0 auto;
  overflow: hidden;
  text-align: center;

  .passphrase {
    margin: 18px;
    font-family: Roboto Mono, monospace;
    font-weight: 500;
    line-height: 1.63;
    letter-spacing: 0.2px;
    color: $grey;
    min-height: 78px;
    text-align: center;
  }

  .ae-button {
    max-width: 190px;
  }
}
</style>
<style lang="scss" src="../components/MobilePageContent.scss" scoped />

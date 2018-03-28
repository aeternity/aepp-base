<template>
  <modal-screen title="New Account 1/2" :redirectToOnClose="{ name: 'intro' }">
    <div class="panel">
      <div class="passphrase">{{seed}}</div>
      <ae-button plain size="small" uppercase @click="newSeed">
        <ae-icon slot="icon" name="refresh" />
        Generate new
      </ae-button>
    </div>
    <p>
      Save these 12 words to a safe place. You need them
      to recover your account in the future. Don't show them
      to anybody or you risk losing all your funds.
    </p>

    <div slot="footer">
      <ae-button type="exciting" @click="setSeed">
        Next
      </ae-button>
      <ae-button
        :to="{ name: keystore ? 'login' : 'recover' }"
        plain
        type="exciting"
        size="small"
        uppercase
      >
        {{keystore ? 'Login with an existing account' : 'Recover with passphrase'}}
      </ae-button>
    </div>
  </modal-screen>
</template>

<script>
  import { mapState } from 'vuex'
  import AeternityClient from '@aeternity/aepp-sdk'
  import { AeLabel, AeButton, AeIcon } from '@aeternity/aepp-components'
  import ModalScreen from '@/components/ModalScreen'

  export default {
    components: { ModalScreen, AeLabel, AeButton, AeIcon },
    data () {
      return {
        seed: undefined
      }
    },
    computed: mapState(['keystore']),
    methods: {
      newSeed () {
        // this.seed = keystore.generateRandomSeed()
        this.seed = AeternityClient.HdWallet.generateRandomSeed()
        // this.seed = 'TODO'
      },
      setSeed () {
        this.$store.commit('setSeed', this.seed)
      }
    },
    mounted () {
      this.newSeed()
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@aeternity/aepp-components/dist/variables.scss';

  .modal-screen .content .panel {
    border-radius: 10px;
    background-color: #fff;
    max-width: 400px;
    margin: 0 auto;
    overflow: hidden;

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

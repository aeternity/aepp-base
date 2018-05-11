<template>
  <modal-screen class="intro">
    <div class="logo">
      <img :src="require('@/assets/intro.svg')" />
      <p>
        æternity gives you easy access to the magic of blockchain
        technology. Instantly login or see how it works.
      </p>
    </div>

    <div slot="footer">
      <template v-if="IS_MOBILE_DEVICE">
        <ae-button :to="{ name: keystore ? 'login' : 'new-account' }" type="exciting">
          {{keystore ? 'Login' : 'Create Account'}}
        </ae-button>
        <ae-button :to="{ name: 'onboarding' }" size="small" plain uppercase>
          See how it works
        </ae-button>
      </template>
      <ae-button v-else @click="toggleRemoteConnectionPrompt" type="exciting">
        Connect your account
      </ae-button>
    </div>
  </modal-screen>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { AeButton } from '@aeternity/aepp-components'
  import IS_MOBILE_DEVICE from '@/lib/isMobileDevice'
  import ModalScreen from '@/components/ModalScreen'

  export default {
    components: { ModalScreen, AeButton },
    data: () => ({ IS_MOBILE_DEVICE }),
    computed: mapState({
      keystore: state => state.mobile.keystore
    }),
    methods: mapMutations(['toggleRemoteConnectionPrompt'])
  }
</script>

<style lang="scss" scoped>
  @import '~@aeternity/aepp-components/dist/variables.scss';

  .intro.modal-screen.ae-overlay {
    background: transparent;

    /deep/ .ae-modal {
      background: transparent;

      .ae-header, header.desktop {
        display: none;
      }

      main.content {
        flex-shrink: 0;
        display: flex;
      }
    }

    .logo {
      text-align: center;
      margin: auto;

      img, p {
        margin: 12px;
      }

      p {
        max-width: 300px;
        font-size: 18px;
        line-height: 1.56;
        color: $anthracite;
      }
    }
  }
</style>

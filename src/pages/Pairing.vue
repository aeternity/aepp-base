<template>
  <modal-page
    class="pairing"
    title="Connect with another device"
    :redirectToOnClose="{ name: loggedIn ? 'apps' : 'intro' }"
  >
    <br />
    <template v-if="!peer">
      <qrcode-reader
        v-if="loggedIn"
        class="qrcode-reader"
        @decode="result => setPairKey(result)"
      />
      <qrcode v-else class="qrcode" :text="String(pairKey)" />
    </template>
    <template v-else>
      {{keystore
        ? 'Another device will sign transactions by this one.'
        : 'Transactions will be signed by another device.'}}
      <ae-button class="disconnect" type="boring" @click="setPairKey">Disconnect</ae-button>
    </template>
  </modal-page>
</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex'
  import { QrcodeReader } from 'vue-qrcode-reader'
  import Qrcode from 'vue-qrcode-component'
  import { AeInput, AeButton } from '@aeternity/aepp-components'
  import ModalPage from '@/components/ModalPage'

  export default {
    components: { Qrcode, QrcodeReader, ModalPage, AeInput, AeButton },
    computed: {
      ...mapState({
        pairKey (state) {
          if (!this.loggedIn && !state.pairKey) {
            const t = Math.round(Math.random() * 1e10)
            this.setPairKey(t)
            return t
          }
          return state.pairKey
        }
      }),
      ...mapGetters(['loggedIn', 'peer', 'keystore'])
    },
    methods: mapMutations(['setPairKey'])
  }
</script>

<style lang="scss">
  @import '~@aeternity/aepp-components/dist/variables.scss';

  .pairing {
    .qrcode-reader {
      max-width: 500px;
    }

    .qrcode img {
      margin: auto;
    }

    .ae-button.disconnect {
      display: block;
      margin-top: 20px;
    }
  }
</style>

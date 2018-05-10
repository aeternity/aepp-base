<template>
  <div class="remote-connection-prompt">
    <h1>Connect your account</h1>
    <div class="steps">
      <div>
        <ae-app-icon class="base" src="static/icons/base.svg" />
        <h2>Bæse</h2>
        <p>1. Open the Bæse æpp on your mobile device</p>
        <p class="small">Not installed? Install from store</p>
      </div>
      <div>
        <ae-app-icon src="static/icons/aepps/settings.svg" />
        <h2>Settings</h2>
        <p>2. Open your settings in the Bæse æpp</p>
      </div>
      <div>
        <ae-app-icon src="static/icons/remote-connect.svg" />
        <h2>Remote Connect</h2>
        <p>3. Open Remote Connect and scan the following QR</p>
      </div>
      <div>
        <qr-code class="qr-code" :text="peerKey" color="#311b58" />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { AeAppIcon } from '@aeternity/aepp-components'
  import QrCode from 'vue-qrcode-component'

  export default {
    components: { AeAppIcon, QrCode },
    computed: mapState(['peerKey'])
  }
</script>

<style scoped lang="scss">
  @import '~@aeternity/aepp-components/dist/variables.scss';

  .remote-connection-prompt {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: hidden;

    h1 {
      font-size: 24px;
    }

    .steps {
      margin: auto 0;
      display: flex;

      > div {
        text-align: center;
        border-right: 1px solid $silver;
        flex-grow: 1;
        flex-basis: 0;
        padding: 10px;

        &:last-child {
          border-right: none;
        }

        .ae-app-icon {
          display: inline-block;

          &.base {
            background-color: $maegenta;
          }
        }

        h2, p {
          margin: 8px 0;
        }

        h2 {
          font-size: 18px;
          font-weight: 500;
        }

        p {
          line-height: 1.44;
          color: $grey;

          &.small {
            font-size: 10px;
            font-weight: 500;
            text-transform: uppercase;
            margin: 18px 0 0 0;
            letter-spacing: .3px;
          }
        }

        .qr-code {
          width: 170px;
          display: inline-block;

          /deep/ img {
            width: 100%;
          }
        }
      }
    }
  }
</style>

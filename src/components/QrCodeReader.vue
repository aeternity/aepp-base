<template>
  <div
    v-if="qrCodeReaderTask"
    class="qr-code-reader"
  >
    <header-mobile>
      <ae-button
        slot="left"
        @click="cancelReading"
        plain
      >
        <ae-icon
          slot="icon"
          name="arrow"
          rotate="180"
        />
      </ae-button>
      {{ qrCodeReaderTask.title }}
    </header-mobile>

    <div
      v-if="browserReader"
      v-show="cameraAllowed"
      class="video-wrapper"
    >
      <video ref="qrCodeVideo" />
    </div>
    <div
      v-if="!cameraAllowed"
      class="permission-denied"
    >
      We don't have access to the camera to scan a QR code.
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { BrowserQRCodeReader } from '@zxing/library/esm5/browser/BrowserQRCodeReader';
import { AeButton, AeIcon } from '@aeternity/aepp-components';
import HeaderMobile from './HeaderMobile.vue';

export default {
  components: { HeaderMobile, AeButton, AeIcon },
  data: () => ({
    cameraAllowed: false,
    browserReader: !process.env.IS_CORDOVA && new BrowserQRCodeReader(),
  }),
  computed: mapState(['qrCodeReaderTask']),
  watch: {
    async cameraAllowed(value) {
      if (!value) {
        this.stopReading();
        return;
      }

      this.qrCodeReaderTask.resolve(await this.scan());
      this.$store.commit('setQrCodeReaderTask');
    },
  },
  async mounted() {
    if (process.env.IS_CORDOVA) {
      await new Promise((resolve, reject) => window.QRScanner
        .prepare((error, status) => (!error && status.authorized
          ? resolve() : reject(error || new Error('Denied to use the camera')))));
      this.cameraAllowed = true;
      return;
    }

    if (navigator.permissions) {
      const status = await navigator.permissions.query({ name: 'camera' });
      this.cameraAllowed = status.state !== 'denied';
      status.onchange = () => {
        this.cameraAllowed = status.state !== 'denied';
      };
      return;
    }

    this.cameraAllowed = true;
  },
  beforeDestroy() {
    this.stopReading();
  },
  methods: {
    async scan() {
      return process.env.IS_CORDOVA
        ? new Promise((resolve, reject) => {
          window.QRScanner.scan((error, text) => (!error && text ? resolve(text) : reject(error)));
          window.QRScanner.show();
          document.body.style.background = 'transparent';
          document.getElementById('app').style.background = 'transparent';
        })
        : (await this.browserReader.decodeFromInputVideoDevice(
          undefined,
          this.$refs.qrCodeVideo,
        )).getText();
    },
    stopReading() {
      if (process.env.IS_CORDOVA) {
        document.body.style.background = '';
        document.getElementById('app').style.background = '';
        window.QRScanner.destroy();
      } else this.browserReader.reset();
    },
    cancelReading() {
      this.stopReading();
      this.qrCodeReaderTask.reject(new Error('Cancelled by user'));
      this.$store.commit('setQrCodeReaderTask');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components/dist/mixins.scss';

.qr-code-reader {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  .header-mobile {
    background: #fff;
  }

  .permission-denied {
    text-align: center;
    line-height: 1.56;
    padding: 0 20px;
    margin: auto;
    font-size: 18px;
  }

  .video-wrapper {
    flex-grow: 1;
    overflow: hidden;
    position: relative;

    video {
      object-fit: cover;
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
}
</style>

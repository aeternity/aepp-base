<template>
  <div class="qr-code-reader">
    <HeaderMobile
      :title="title"
      fill="light"
      left-button-icon-name="back"
      @left-button-click="cancelReading"
    />

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
      {{ $t('remote-connection.settings.new.camera-not-allowed') }}
    </div>
  </div>
</template>

<script>
import { BrowserQRCodeReader } from '@zxing/library/esm5/browser/BrowserQRCodeReader';
import { handleUnknownError } from '../lib/utils';
import HeaderMobile from './mobile/Header.vue';

export default {
  components: { HeaderMobile },
  props: {
    title: { type: String, required: true },
    resolve: { type: Function, required: true },
    reject: { type: Function, required: true },
  },
  data: () => ({
    cameraAllowed: false,
    browserReader: !process.env.IS_CORDOVA && new BrowserQRCodeReader(),
  }),
  watch: {
    async cameraAllowed(value) {
      if (!value) {
        this.stopReading();
        return;
      }

      try {
        this.resolve(await this.scan());
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.cameraAllowed = false;
          return;
        }
        handleUnknownError(error);
      }
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

    const status = navigator.permissions
      && await navigator.permissions.query({ name: 'camera' }).catch((error) => {
        const firefoxExceptionMessage = '\'name\' member of PermissionDescriptor \'camera\' is not a valid value for enumeration PermissionName.';
        if (error.message !== firefoxExceptionMessage) handleUnknownError(error);
        return null;
      });
    if (status) {
      this.cameraAllowed = status.state !== 'denied';
      status.onchange = () => {
        this.cameraAllowed = status.state !== 'denied';
      };
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
      this.reject(new Error('Cancelled by user'));
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/globals/functions.scss';

.qr-code-reader {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 100vh;

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

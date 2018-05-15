<template>
  <modal-page
    title="Remote Connection"
    :redirectToOnClose="{ name: 'settings-remote-connection' }"
    class="settings"
  >
    <qr-code-reader @decode="decode" :video-constraints="videoConstraints" />
  </modal-page>
</template>

<script>
  import ModalPage from '@/components/ModalPage.vue'
  import { QrcodeReader as QrCodeReader } from 'vue-qrcode-reader'

  export default {
    components: {
      ModalPage,
      QrCodeReader
    },
    data: () => ({
      videoConstraints: {
        aspectRatio: 1,
        width: { min: 360, ideal: 720, max: 1920 },
        height: { min: 240, ideal: 720, max: 1080 }
      }
    }),
    methods: {
      decode (key) {
        this.$store.commit('addFollower', {
          key,
          name: prompt('Name this device') || 'Unnamed'
        })
        this.$router.push({ name: 'settings-remote-connection' })
      }
    }
  }
</script>

<style src="./Settings.scss" lang="scss" scoped />

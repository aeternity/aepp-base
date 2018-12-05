<template>
  <div
    :style="{
      width: `${size}px`,
      height: `${size}px`,
    }"
    class="ae-qr-code"
  >
    <div ref="qrCode" />
  </div>
</template>

<script>
import renderQrCodeSvg from '../lib/renderQrCodeSvg';

export default {
  props: {
    data: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 170,
    },
  },
  watch: {
    data() {
      this.renderQrCode();
    },
  },
  mounted() {
    this.renderQrCode();
  },
  methods: {
    renderQrCode() {
      this.$refs.qrCode.replaceWith(renderQrCodeSvg(this.data, this.size));
    },
  },
};
</script>

<template>
  <div
    :style="{
      width: `${size}px`,
      height: `${size}px`,
    }"
    class="ae-qr-code"
  />
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
      if (this.$el.firstChild) this.$el.removeChild(this.$el.firstChild);
      this.$el.appendChild(renderQrCodeSvg(this.data, this.size));
    },
  },
};
</script>

<template>
  <div class="ae-qr-code" />
</template>

<script>
import renderQrCodeSvg from '../lib/renderQrCodeSvg';

export default {
  props: {
    data: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.$watch(({ data }) => data, () => this.renderQrCode(), { immediate: true });
  },
  methods: {
    renderQrCode() {
      if (this.$el.firstChild) this.$el.removeChild(this.$el.firstChild);
      const svgNode = renderQrCodeSvg(this.data, 400);
      svgNode.removeAttribute('width');
      svgNode.removeAttribute('height');
      svgNode.setAttribute('viewBox', '0 0 400 400');
      this.$el.appendChild(svgNode);
    },
  },
};
</script>

<style lang="scss" scoped>
@use '../styles/functions';

.ae-qr-code {
  padding: functions.rem(5px);

  ::v-deep svg {
    display: block;
  }
}
</style>

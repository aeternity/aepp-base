<template>
  <canvas class="ae-identicon" />
</template>

<script>
import { renderIcon } from '@download/blockies';

export default {
  props: {
    address: { type: String, required: true },
  },
  mounted() {
    this.$watch(
      ({ address }) => address,
      () => this.render(),
      { immediate: true },
    );
  },
  methods: {
    render() {
      renderIcon({ seed: this.address }, this.$el);
    },
  },
};
</script>

<style lang="scss" scoped>
.ae-identicon {
  display: inline-block;
  border-radius: 50%;
  height: 2rem;
}
</style>

<template>
  <div
    v-if="anchor"
    v-clickaway="emitClose"
    :style="style"
    class="ae-popover"
  >
    <slot />
  </div>
</template>

<script>
import Vue from 'vue';
import { isEqual } from 'lodash-es';
import { directive as clickaway } from 'vue-clickaway';

export default {
  directives: { clickaway },
  props: {
    anchor: {
      type: Vue,
      default: null,
    },
  },
  data: () => ({
    style: {},
  }),
  mounted() {
    this.updateStyles();
  },
  updated() {
    this.updateStyles();
  },
  methods: {
    updateStyles() {
      if (!this.anchor) return;
      const { right, bottom } = this.anchor.$el.getBoundingClientRect();
      const { width } = this.$el.getBoundingClientRect();
      const style = {
        left: `${right - width}px`,
        top: `${bottom}px`,
      };
      if (isEqual(style, this.style)) return;
      this.style = style;
    },
    emitClose() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';

.ae-popover {
  position: absolute;
  box-shadow: 0 0 rem(8px) rgba(#1B4479, 0.1);
  border-radius: 4px;
  min-width: 310px;
  background: #fff;
  overflow: hidden;
}
</style>

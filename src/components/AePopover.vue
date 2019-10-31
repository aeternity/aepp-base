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
import { DOMRect } from '../lib/utils';

const originProp = {
  type: Object,
  default: () => ({ vertical: 'top', horizontal: 'left' }),
  validator: ({ vertical, horizontal }) => (
    ['top', 'center', 'bottom'].includes(vertical)
    && ['left', 'center', 'right'].includes(horizontal)),
};

export default {
  directives: { clickaway },
  props: {
    anchor: {
      type: [Vue, Element],
      default: null,
    },
    anchorOrigin: originProp,
    transformOrigin: originProp,
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
      const anchorEl = this.anchor instanceof Vue ? this.anchor.$el : this.anchor;

      let parentEl = anchorEl.parentNode;
      while (parentEl !== document.body) {
        const parentElPosition = getComputedStyle(parentEl).getPropertyValue('position');
        if (parentElPosition === 'relative') {
          throw new Error('AePopover: Relative positioning is not supported yet');
        }
        if (parentElPosition !== 'static') break;
        parentEl = parentEl.parentNode;
      }
      const parentElRect = parentEl === document.body
        ? new DOMRect(-window.scrollX, -window.scrollY) : parentEl.getBoundingClientRect();

      const anchorElRect = anchorEl.getBoundingClientRect();
      const {
        top, right, bottom, left,
      } = new DOMRect(
        anchorElRect.left - parentElRect.left,
        anchorElRect.top - parentElRect.top,
        anchorElRect.width,
        anchorElRect.height,
      );

      const anchorPoint = {
        x: {
          left,
          center: (left + right) / 2,
          right,
        }[this.anchorOrigin.horizontal],
        y: {
          top,
          center: (top + bottom) / 2,
          bottom,
        }[this.anchorOrigin.vertical],
      };

      const { width, height } = this.$el.getBoundingClientRect();
      const popoverPoint = {
        x:
          anchorPoint.x - {
            left: 0,
            center: width / 2,
            right: width,
          }[this.transformOrigin.horizontal],
        y:
          anchorPoint.y - {
            top: 0,
            center: height / 2,
            bottom: height,
          }[this.transformOrigin.vertical],
      };
      const style = {
        top: `${popoverPoint.y}px`,
        left: `${popoverPoint.x}px`,
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
@import '../styles/functions';

.ae-popover {
  position: absolute;
  box-shadow: 0 0 rem(8px) rgba(#1B4479, 0.1);
  border-radius: 4px;
  min-width: 310px;
  background: #fff;
  overflow: hidden;
}
</style>

<template>
  <div
    v-clickaway="hideTooltip"
    :style="style"
    class="tooltip"
  >
    <div v-if="showTooltip">
      <ButtonPlain @click="hideTooltip">
        <Close />
      </ButtonPlain>
      <slot />
      <div class="arrow" />
    </div>
    <div
      class="selection"
      @click="showTooltip = true"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import { isEqual } from 'lodash-es';
import { directive as clickaway } from 'vue-clickaway';
import ButtonPlain from './ButtonPlain.vue';
import { Close } from './icons';

const originProp = {
  type: String,
  default: undefined,
  validator: origin => (
    ['top', 'bottom'].includes(origin)
  ),
};

export default {
  directives: { clickaway },
  components: { ButtonPlain, Close },
  props: {
    anchor: {
      type: [Vue, Element],
      default: null,
    },
    origin: originProp,
  },
  data: () => ({
    style: {},
    showTooltip: true,
  }),
  mounted() {
    if (!this.origin) {
      this.style = {
        top: '193px',
      };
      return;
    }
    this.updateStyles();
    this.hideTooltip();
  },
  updated() {
    this.updateStyles();
  },
  methods: {
    updateStyles() {
      if (!this.anchor || !this.showTooltip) return;
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

      const anchorElRect = anchorEl.getBoundingClientRect();

      const {
        top, bottom,
      } = anchorElRect;
      const { left, height } = this.$el.getBoundingClientRect();

      const arrowSize = 12;
      const arrowX = (anchorElRect.left + anchorElRect.right) / 2 - left - arrowSize;
      const togglePointY = {
        top: top - (height + arrowSize),
        bottom: bottom + arrowSize,
      }[this.origin];

      const style = {
        top: `${togglePointY}px`,
      };
      if (isEqual(style, this.style)) return;
      this.style = style;

      const arrowStyleTop = {
        'margin-top': '14px',
        'border-top-width': `${arrowSize}px`,
        'border-top-color': '#203040',
      };

      const arrowStyleBottom = {
        top: '-10px',
        'border-top-width': '0px',
        'border-bottom-width': `${arrowSize}px`,
        'border-bottom-color': '#203040',
      };

      const arrowStyle = Object.assign({
        top: arrowStyleTop,
        bottom: arrowStyleBottom,
      }[this.origin], { left: `${arrowX}px` });
      Object.assign(this.$el.querySelector('.arrow').style, arrowStyle);

      const selectionStyle = {
        width: `${anchorElRect.width}px`,
        height: `${anchorElRect.height}px`,
        top: `${anchorElRect.top}px`,
        left: `${anchorElRect.left}px`,
      };
      Object.assign(this.$el.querySelector('.selection').style, selectionStyle);
    },
    hideTooltip() {
      this.showTooltip = false;
      const tooltipStyle = {
        'background-color': 'transparent',
        'box-shadow': 'none',
      };
      Object.assign(this.style, tooltipStyle);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/variables/colors.scss';
@import '../styles/placeholders/typography.scss';

.tooltip {
  position: absolute;
  margin: 0 rem(32px);
  padding: rem(16px);
  width: calc(100% - 96px);
  max-width: rem(386px);
  border-radius: rem(8px);
  background-color: $color-neutral-negative-3;
  box-shadow: 0 0 rem(8px) rgba(#1B4479, 0.1);
  z-index: 1;

  .button-plain {
    float: right;

    svg.close {
      color: #fff;
    }
  }

  .guide {
    margin: 0;

    /deep/ .content {
      font-weight: normal;
    }
  }

  .selection {
    position: fixed;
    border: rem(1px) solid rgba($color-primary, 0.3);
    background-color: rgba($color-primary, 0.2);
  }

  .arrow {
    position: absolute;
    border: solid rem(12px) transparent;
  }
}
</style>

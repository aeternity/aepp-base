<template>
  <div
    class="tooltip"
    :style="style"
  >
    <div
      ref="content"
      class="content"
    >
      <ButtonPlain @click="$emit('close')">
        <Close />
      </ButtonPlain>
      <slot />
      <div
        v-if="anchorRect"
        class="arrow"
        :class="showBelow ? 'above' : 'below'"
        :style="arrowStyle"
      />
    </div>
  </div>
</template>

<script>
import { clamp } from 'lodash-es';
import ButtonPlain from '../ButtonPlain.vue';
import { Close } from '../icons';
import { DOMRect } from '../../lib/utils';

const arrowSize = 12;

export default {
  components: { ButtonPlain, Close },
  props: {
    anchorRect: { type: [DOMRect, window.DOMRect], default: null },
  },
  data: () => ({ isMounted: false }),
  computed: {
    showBelow() {
      return this.anchorRect && this.anchorRect.top < document.documentElement.clientHeight / 2;
    },
    style() {
      if (!this.anchorRect || !this.isMounted) return {};
      const { bottom, top } = this.anchorRect;

      return this.showBelow
        ? { top: `${bottom + arrowSize}px` }
        : { bottom: `${document.documentElement.clientHeight - top + arrowSize}px` };
    },
    arrowStyle() {
      if (!this.anchorRect || !this.isMounted) return {};
      const { left, width } = this.$refs.content.getBoundingClientRect();
      const safeOffset = 7;
      const arrowLeft = clamp(
        (this.anchorRect.left + this.anchorRect.right) / 2 - left - arrowSize,
        safeOffset,
        width - arrowSize * 2 - safeOffset,
      );
      return { left: `${arrowLeft}px` };
    },
  },
  mounted() {
    this.isMounted = true;
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/typography';

.tooltip {
  position: fixed;
  left: 0;
  right: 0;
  padding: 0 rem(32px);

  .content {
    position: relative;
    max-width: $screen-phone - 96;
    margin: 0 auto;
    padding: rem(16px);
    border-radius: rem(8px);
    background-color: $color-neutral-negative-3;
    box-shadow: 0 0 rem(8px) rgba(#1B4479, 0.1);
    color: $color-neutral-positive-1;

    &, h1 {
      @extend %face-sans-base;
    }

    h1 {
      margin: 0;
      font-weight: normal;
    }

    .button-plain {
      float: right;
    }

    h1, .button-plain {
      color: #fff;
    }

    .arrow {
      $arrow-size: 12px;
      position: absolute;
      border: $arrow-size solid transparent;

      &.above {
        top: -$arrow-size * 2;
        border-bottom-width: $arrow-size;
        border-bottom-color: $color-neutral-negative-3;
      }

      &.below {
        bottom: -$arrow-size * 2;
        border-top-width: $arrow-size;
        border-top-color: $color-neutral-negative-3;
      }
    }
  }
}
</style>

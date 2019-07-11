<template>
  <Overlay
    class="tooltips-modal"
    @click="resolve"
  >
    <div
      v-for="(t, idx) in tooltips"
      :key="idx"
      :ref="`selection-${idx}`"
      class="selection"
      @click="activeIdx = idx"
    />

    <Tooltip
      v-if="activeIdx !== 'none'"
      :class="{ initial: activeIdx === 'initial' }"
      :anchor-rect="anchorRects[activeIdx]"
      @close="activeIdx = 'none'"
    >
      <template v-if="activeIdx === 'initial'">
        <h1>Learn how to use the Base æpp</h1>
        Tap on any
        <span class="selection">highlighted region</span>
        to learn more about its functionality.
      </template>
      <template v-else>
        <h1>{{ tooltips[activeIdx].header }}</h1>
        {{ tooltips[activeIdx].content }}
      </template>
    </Tooltip>
  </Overlay>
</template>

<script>
import Overlay from '../Overlay.vue';
import Tooltip from './Tooltip.vue';

export default {
  components: { Overlay, Tooltip },
  props: {
    resolve: { type: Function, required: true },
    tooltips: { type: Array, required: true },
  },
  data: () => ({
    activeIdx: 'initial',
    anchorRects: [],
  }),
  watch: {
    anchorRects() {
      this.anchorRects.forEach((rect, idx) => {
        Object.assign(this.$refs[`selection-${idx}`][0].style, {
          left: `${rect.left}px`,
          top: `${rect.top}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
        });
      });
    },
  },
  mounted() {
    const updateAnchorRects = () => {
      const padding = 5;
      this.anchorRects = this.tooltips
        .map(({ selector }) => document.querySelector(selector).getBoundingClientRect())
        .map(rect => new DOMRect(
          rect.x - padding,
          rect.y - padding,
          rect.width + padding * 2,
          rect.height + padding * 2,
        ));
    };
    updateAnchorRects();
    window.addEventListener('resize', updateAnchorRects);
    this.$once('hook:destroyed', () => window.removeEventListener('resize', updateAnchorRects));
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables/colors.scss';
@import '../../styles/globals/functions.scss';

.tooltips-modal {
  padding: 0;
  background: transparent;

  .selection {
    border: rem(1px) solid rgba($color-alternative, 0.3);
    background-color: rgba($color-alternative, 0.2);
  }

  div.selection {
    position: fixed;
  }

  .tooltip.initial {
    position: static;
    margin: auto;
  }
}
</style>

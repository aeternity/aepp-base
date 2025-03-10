<template>
  <div class="tooltips-modal" @click.self="resolve">
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
        <h1>{{ $t('modal.tooltips-modal.initial-header') }}</h1>
        <i18n path="modal.tooltips-modal.initial-content">
          <span class="selection">{{ $t('modal.tooltips-modal.highlighted-region') }}</span>
        </i18n>
      </template>
      <template v-else>
        <h1>{{ tooltips[activeIdx].header }}</h1>
        {{ tooltips[activeIdx].content }}
      </template>
    </Tooltip>
  </div>
</template>

<script>
import { DOMRect } from '../../lib/utils';
import Tooltip from './Tooltip.vue';

export default {
  components: { Tooltip },
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
        .map(
          (rect) =>
            new DOMRect(
              rect.left - padding,
              rect.top - padding,
              rect.width + padding * 2,
              rect.height + padding * 2,
            ),
        );
    };
    setTimeout(updateAnchorRects);
    window.addEventListener('resize', updateAnchorRects);
    window.addEventListener('scroll', updateAnchorRects);
    this.$once('hook:destroyed', () => {
      window.removeEventListener('resize', updateAnchorRects);
      window.removeEventListener('scroll', updateAnchorRects);
    });
  },
};
</script>

<style lang="scss" scoped>
@use '../../styles/variables';
@use '../../styles/functions';

.tooltips-modal {
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  .selection {
    border: functions.rem(1px) solid rgba(variables.$color-secondary, 0.5);
    background-color: rgba(variables.$color-secondary, 0.3);
  }

  div.selection {
    position: fixed;
  }

  .tooltip.initial {
    position: static;
    margin: auto;
    z-index: 1;
  }
}
</style>

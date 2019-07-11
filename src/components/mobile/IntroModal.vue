<template>
  <MobilePage
    fill="dark"
    class="intro-modal"
    right-button-icon-name="close"
    @right-button-click="resolve"
  >
    <template v-for="({ header, body }, idx) in content">
      <Guide :key="`${idx}-header`">
        <em>{{ header }}</em>
      </Guide>
      <p
        :key="`${idx}-body`"
        class="big"
      >
        {{ body }}
      </p>
    </template>
  </MobilePage>
</template>

<script>
import MobilePage from './Page.vue';
import Guide from '../Guide.vue';

export default {
  components: { MobilePage, Guide },
  props: {
    resolve: { type: Function, required: true },
    content: { type: Array, required: true },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/placeholders/typography.scss';

.intro-modal {
  .guide {
    margin-bottom: 0;
  }

  p.big {
    margin-top: rem(5px);
    @extend %face-sans-base;
    color: #fff;
  }
}
</style>

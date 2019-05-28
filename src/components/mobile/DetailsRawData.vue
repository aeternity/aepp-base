<template>
  <DetailsField
    class="details-raw-data"
    v-bind="$attrs"
  >
    <code>
      {{ dataAsString }}
    </code>
  </DetailsField>
</template>

<script>
import DetailsField from './DetailsField.vue';

export default {
  components: { DetailsField },
  props: {
    data: { type: [String, Uint8Array], required: true },
  },
  computed: {
    dataAsString() {
      if (typeof this.data === 'string') return this.data;
      return Buffer.from(this.data).toString('hex');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/placeholders/typography.scss';
@import '../../styles/variables/colors.scss';

.details-field code {
  @extend %face-mono-base;
  color: var(--color-primary, $color-neutral-maximum);
  overflow-wrap: break-word;
}
</style>

<template>
  <confirm-modal-field
    class="confirm-modal-raw-data"
    v-bind="$attrs"
  >
    <code>
      {{ dataAsString }}
    </code>
  </confirm-modal-field>
</template>

<script>
import ConfirmModalField from './ConfirmModalField.vue';

export default {
  components: { ConfirmModalField },
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
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.confirm-modal-field {
  code {
    @extend %face-mono-base;
    color: $color-neutral-maximum;
    word-break: break-word;
  }
}
</style>

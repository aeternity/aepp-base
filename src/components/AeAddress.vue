<template>
  <div
    v-copy-on-click="disableCopyOnClick ? '' : address"
    v-remove-spaces-on-copy
    class="ae-address"
    :class="mode"
  >
    <div v-for="(chunk, idx) in chunks" :key="idx">
      {{ chunk }}
    </div>
  </div>
</template>

<script>
import { times } from 'lodash-es';
import copyOnClick from '../directives/copyOnClick';
import removeSpacesOnCopy from '../directives/removeSpacesOnCopy';
import formatAddress from '../filters/formatAddress';

export default {
  directives: {
    copyOnClick,
    removeSpacesOnCopy,
  },
  props: {
    address: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      validator: (value) => ['full', 'three-columns', 'three-columns-short'].includes(value),
      default: 'full',
    },
    disableCopyOnClick: Boolean,
  },
  computed: {
    chunks() {
      const chunks = formatAddress(this.address, 'full').split(' ');
      if (this.mode === 'three-columns-short') {
        return [...chunks.slice(0, 3), ...times(3, () => '···'), ...chunks.slice(-3)];
      }
      return chunks;
    },
  },
};
</script>

<style lang="scss" scoped>
@use '../styles/functions';
@use '../styles/typography';
@use 'copied';

.ae-address {
  $char-width: 11px;
  $chunk-width-rem: functions.rem(3 * $char-width);

  display: grid;
  grid-template-columns: repeat(auto-fill, $chunk-width-rem);
  grid-column-gap: functions.rem($char-width);
  justify-content: space-between;
  @extend %face-mono-base;
  letter-spacing: functions.rem(1.5px);

  &.three-columns,
  &.three-columns-short {
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: functions.rem(12px);
    letter-spacing: functions.rem(1.9px);
    font-weight: 500;
  }

  &.v-copied {
    @extend %copied;
  }
}
</style>

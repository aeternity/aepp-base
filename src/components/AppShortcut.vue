<template>
  <ae-link
    v-bind="$attrs"
    class="app-shortcut"
  >
    <img
      :src="icon"
      :alt="name"
    >
    {{ name }}
  </ae-link>
</template>

<script>
import { AeLink } from '@aeternity/aepp-components-3';
import { DEFAULT_ICON } from '../lib/appsRegistry';

export default {
  components: { AeLink },
  props: {
    name: { type: String, required: true },
    icon: { type: String, default: DEFAULT_ICON },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.app-shortcut {
  display: block;
  width: 80px;
  text-decoration: none;
  text-align: center;
  @extend %face-sans-s;
  font-weight: 500;
  color: $color-neutral-negative-3;

  img {
    width: rem(75px);
    height: rem(75px);
    border-radius: rem(18px);
    box-shadow: 0 0 16px rgba(0, 33, 87, 0.15);
    margin-bottom: 5px;
  }
}
</style>

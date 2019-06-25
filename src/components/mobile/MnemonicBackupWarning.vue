<template>
  <IconGroup>
    <slot />
    <span
      v-if="!mnemonicBackedUp"
      class="warning-icon"
    >
      !
    </span>
  </IconGroup>
</template>

<script>
import { mapState } from 'vuex';
import IconGroup from '../IconGroup.vue';

export default {
  components: { IconGroup },
  computed: mapState('accounts/hdWallet', ['mnemonicBackedUp']),
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables/typography.scss';
@import '../../styles/variables/colors.scss';
@import '../../styles/globals/functions.scss';

.warning-icon {
  border-radius: 50%;
  width: rem(14px);
  height: rem(14px);
  background-color: $color-primary;
  color: #fff;
  font-family: $font-sans;
  font-size: rem(12px);
  line-height: rem(14px);
  text-align: center;
  font-weight: 600;
}
</style>

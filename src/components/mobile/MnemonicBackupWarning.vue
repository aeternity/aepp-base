<template>
  <IconGroup>
    <slot />
    <span
      v-if="!mnemonicBackedUp"
      class="warning-icon"
    ><!-- eslint-disable-line @intlify/vue-i18n/no-raw-text -->
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
@use '../../styles/variables';
@use '../../styles/functions';

.warning-icon {
  border-radius: 50%;
  width: functions.rem(14px);
  height: functions.rem(14px);
  background-color: variables.$color-primary;
  color: #fff;
  font-family: variables.$font-sans;
  font-size: functions.rem(12px);
  line-height: functions.rem(14px);
  text-align: center;
  font-weight: 600;
}
</style>

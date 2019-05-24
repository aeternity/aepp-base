<template>
  <AeInput
    class="ae-input-password"
    :type="showPassword ? 'text' : 'password'"
    :value="value"
    v-bind="$attrs"
    :header="header"
    v-on="$listeners"
  >
    <slot
      v-for="slot in Object.keys($slots)"
      :slot="slot"
      :name="slot"
    />
    <AeToolbarButton
      v-if="!hideRevealButton"
      slot="footer-right"
      type="button"
      @click="showPassword = !showPassword"
    >
      <Eye />
    </AeToolbarButton>
  </AeInput>
</template>

<script>
import AeInput from './AeInput.vue';
import AeToolbarButton from './AeToolbarButton.vue';
import { Eye } from './icons';

export default {
  components: { AeInput, AeToolbarButton, Eye },
  props: {
    value: { type: String, default: '' },
    header: { type: String, default: 'Password' },
    hideRevealButton: { type: Boolean, default: false },
  },
  data: () => ({ showPassword: false }),
};
</script>

<style lang="scss" scoped>
.ae-input-password /deep/ input::-ms-reveal {
  display: none;
}
</style>

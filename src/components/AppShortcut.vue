<template>
  <ButtonPlain v-bind="$attrs" class="app-shortcut" v-on="$listeners">
    <img :class="{ iconNotPadded }" :src="icon" :alt="name" />
    {{ name }}
  </ButtonPlain>
</template>

<script>
import DEFAULT_ICON from '../assets/icons/aepp-default.svg';
import ButtonPlain from './ButtonPlain.vue';

export default {
  components: { ButtonPlain },
  props: {
    name: { type: String, required: true },
    icon: { type: String, default: DEFAULT_ICON },
    iconNotPadded: Boolean,
  },
};
</script>

<style lang="scss" scoped>
@use '../styles/variables';
@use '../styles/functions';
@use '../styles/typography';

.app-shortcut {
  width: 80px;
  @extend %face-sans-s;
  font-weight: 500;
  color: variables.$color-neutral-negative-3;
  overflow-wrap: break-word;

  img {
    box-sizing: border-box;
    width: functions.rem(75px);
    height: functions.rem(75px);
    border-radius: functions.rem(18px);
    box-shadow: 0 0 16px rgba(0, 33, 87, 0.15);
    margin-bottom: 5px;
    background: #fff;

    &.iconNotPadded {
      padding: functions.rem(10px);
    }
  }
}
</style>

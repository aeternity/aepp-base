<template>
  <ListItem
    v-bind="$attrs"
    class="list-item-choose"
    :class="{ active, checked }"
    v-on="$listeners"
  >
    <slot
      v-for="slot in Object.keys($slots)"
      :slot="slot"
      :name="slot"
    />
  </ListItem>
</template>

<script>
import ListItem from './ListItem.vue';

export default {
  components: { ListItem },
  props: {
    active: Boolean,
    checked: Boolean,
  },
};
</script>

<style lang="scss" scoped>
@use '../styles/variables';
@use '../styles/functions';
@use '../styles/typography';

.list-item-choose {
  position: relative;
  margin-bottom: functions.rem(8px);
  overflow: hidden;
  border-radius: functions.rem(4px);
  background-color: variables.$color-neutral-positive-3;
  filter: grayscale(100%);

  &.active {
    background-color: variables.$color-neutral-maximum;
    box-shadow: 0 0 functions.rem(8px) rgba(#1B4479, 0.15);
    filter: none;
  }

  &.checked {
    &::before {
      content: '';
      position: absolute;
      right: 0;
      border-width: functions.rem(32px) 0 0 functions.rem(32px);
      border-style: solid;
      border-color: variables.$color-alternative transparent;
    }

    &::after {
      content: '✓';
      position: absolute;
      top: 0;
      right: functions.rem(3px);
      @extend %face-sans-s;
      font-weight: 500;
      color: variables.$color-neutral-maximum;
    }
  }

  ::v-deep {
    .content img {
      width: functions.rem(40px);
    }

    & + .list-item .content {
      border-top: none;
    }
  }
}
</style>

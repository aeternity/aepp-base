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
@import '../styles/typography';

.list-item-choose {
  position: relative;
  margin-bottom: rem(8px);
  overflow: hidden;
  border-radius: rem(4px);
  background-color: $color-neutral-positive-3;
  filter: grayscale(100%);

  &.active {
    background-color: $color-neutral-maximum;
    box-shadow: 0 0 rem(8px) rgba(#1B4479, 0.15);
    filter: none;
  }

  &.checked {
    &::before {
      content: '';
      position: absolute;
      right: 0;
      border-width: rem(32px) 0 0 rem(32px);
      border-style: solid;
      border-color: $color-alternative transparent;
    }

    &::after {
      content: '✓';
      position: absolute;
      top: 0;
      right: rem(3px);
      @extend %face-sans-s;
      font-weight: 500;
      color: $color-neutral-maximum;
    }
  }

  /deep/ {
    .content img {
      width: rem(40px);
    }

    & + .list-item .content {
      border-top: none;
    }
  }
}
</style>

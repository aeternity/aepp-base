<template>
  <component
    :is="renderAs"
    :to="to"
    :class="{ inactive, [type]: true }"
    class="list-item"
    @click="$emit('click', $event)"
  >
    <slot name="identicon"/>
    <div class="content">
      <div class="title">
        <slot/>
      </div>
      <div class="subtitle">
        <slot name="subtitle"/>
      </div>
    </div>
    <div class="space" />
    <slot name="right" />
  </component>
</template>

<script>
export default {
  props: {
    to: { type: [Object, String], default: undefined },
    type: {
      type: String,
      validator: value => ['exciting', 'dramatic'].includes(value),
      default: undefined
    },
    inactive: { type: Boolean, default: false }
  },
  computed: {
    renderAs () {
      if (this.to) return 'router-link'
      if (this.inactive) return 'div'
      return 'label'
    }
  }
}
</script>

<style lang="scss">
@import '~@aeternity/aepp-components/dist/variables.scss';

.list-item {
  height: 60px;
  font-size: 18px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #f0f0f0;
  padding: 0 20px;

  &.exciting {
    color: $aubergine;
  }

  &.dramatic {
    color: $maegenta;
  }

  &:not(.inactive) {
    cursor: pointer;

    &:hover {
      background-color: $smoke;
    }
  }

  .space {
    flex-grow: 1;
  }

  .title {
    font-size: 15px;
    font-weight: 500;
    color: #203040;
  }

  .subtitle {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 13px;
    color: #76818d;
  }

  .content {
    margin-left: 8px;
  }
}
</style>

<template>
  <component
    :is="renderAs"
    :to="to"
    class="settings-item"
    :class="{ inactive }"
    @click="$emit('click', $event)"
  >
    <slot />
  </component>
</template>

<script>
  export default {
    props: {
      to: undefined,
      inactive: Boolean
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

  .settings-item {
    height: 60px;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #f0f0f0;
    padding: 0 20px;

    &:not(.inactive) {
      cursor: pointer;

      &:hover {
        background-color: $smoke;
      }
    }
  }
</style>

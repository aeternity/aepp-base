<template>
  <div class="settings-heading">
    <slot />
  </div>
</template>

<style lang="scss">
@import '~@aeternity/aepp-components/dist/variables.scss';

.settings-heading {
  color: $grey;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
  border-bottom: 2px solid #f0f0f0;
  padding: 25px 20px 10px;
}
</style>

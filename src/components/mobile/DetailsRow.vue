<template>
  <div class="details-row">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.details-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>

<template>
  <div class="step">
    <slot />
  </div>
</template>

<style scoped lang="scss">
@import '../../styles/variables';

.step {
  text-align: center;
  padding: 10px;

  /deep/ {
    .ae-app-icon {
      display: inline-block;

      &.base {
        background-color: $color-primary;
      }
    }

    h2, p {
      margin: 8px 0;
    }

    h2 {
      font-size: 18px;
      font-weight: 500;
    }

    p {
      line-height: 1.44;
      color: $color-neutral;

      &.small {
        font-size: 10px;
        font-weight: 500;
        text-transform: uppercase;
        margin: 18px 0 0 0;
        letter-spacing: .3px;
      }
    }
  }
}
</style>

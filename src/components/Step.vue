<template>
  <div class="step">
    <slot />
  </div>
</template>

<style scoped lang="scss">
@import '~@aeternity/aepp-components/dist/variables.scss';

.step {
  text-align: center;
  padding: 10px;

  /deep/ {
    .ae-app-icon {
      display: inline-block;

      &.base {
        background-color: $maegenta;
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
      color: $grey;

      &.small {
        font-size: 10px;
        font-weight: 500;
        text-transform: uppercase;
        margin: 18px 0 0 0;
        letter-spacing: .3px;
      }
    }

    .qr-code {
      width: 170px;
      display: inline-block;

      img {
        width: 100%;
      }
    }
  }
}
</style>

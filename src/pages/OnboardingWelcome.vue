<template>
  <div class="onboarding-welcome">
    <div class="wrapper">
      <div class="cubes" />
      <div class="account" />
    </div>
    <h1>Welcome to the base æpp</h1>
    <p>
      æternity gives you easy access to the magic of blockchain technology.
      Follow these steps or just jump in.
    </p>
  </div>
</template>

<style lang="scss" scoped>
.onboarding-welcome {
  &.v-enter-active, &.v-leave-active {
    .wrapper {
      .cubes, .account {
        transition-property: background-position, opacity;
      }

      .cubes {
        transition-duration: .5s;
      }
    }
  }

  &.v-enter-active {
    transition-duration: 1s;

    .wrapper {
      .cubes, .account {
        transition-timing-function: ease-out;
      }

      .cubes {
        transition-delay: .5s;
      }

      .account {
        transition-duration: .5s;
      }
    }
  }

  &.v-leave-active {
    transition-duration: .5s;

    .wrapper {
      .cubes, .account {
        transition-timing-function: ease-in;
      }

      .account {
        transition-delay: .25s;
        transition-duration: .25s;
      }
    }
  }

  &.v-enter, &.v-leave-to {
    .wrapper {
      .cubes, .account {
        opacity: 0;
      }
    }
  }

  &.v-enter .wrapper {
    .cubes {
      background-position-x: 100px;
    }

    .account {
      background-position-y: top;
    }
  }

  &.v-leave-to .wrapper {
    .cubes {
      background-position-x: -200px;
    }

    .account {
      background-position-x: -25%;
    }
  }

  .wrapper {
    height: 271px;
    margin-top: 20px;
    margin-bottom: 20px;
    position: relative;

    .cubes, .account {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }

    .cubes {
      background: url('../assets/onboarding/cube.svg') repeat-x center;
      background-position-x: -35px;
    }

    .account {
      background: url('../assets/onboarding/account-active-big.svg') no-repeat center;
    }
  }
}
</style>

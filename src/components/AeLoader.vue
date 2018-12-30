<template>
  <span class="ae-loader">
    <svg
      viewBox="0 0 100 100"
    >
      <defs>
        <radialGradient
          id="grad"
          cx="20%"
          cy="0%"
          r="50%"
        >
          <stop
            offset="30%"
            class="stop-start"
          />
          <stop
            offset="100%"
            class="stop-end"
          />
        </radialGradient>
      </defs>

      <path
        fill="none"
        stroke="url(#grad)"
        stroke-linecap="round"
        stroke-width="8"
        d="M 30,6 A 46,46 0 1,0 70,6"
      />
    </svg>
  </span>
</template>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

@keyframes rotation {
  to {
    transform: rotate(360deg);
  }
}

.ae-loader {
  display: inline-block;
  width: rem(36px);
  height: auto;

  svg {
    width: 100%;
    height: 100%;

    .stop-start {
      stop-color: $color-white;
    }

    .stop-end {
      stop-color: $color-primary;
    }
  }

  transform-origin: 50% 43%;
  animation: rotation 2s linear infinite;
}
</style>

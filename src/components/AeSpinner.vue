<template>
  <svg
    viewBox="0 0 100 100"
    class="ae-spinner"
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
      d="m30.002 8.5863a46 46 0 1 0 40 0"
    />
  </svg>
</template>

<style lang="scss" scoped>
@use '../styles/variables';
@use '../styles/functions';

.ae-spinner {
  width: functions.rem(36px);
  animation: rotation 2s linear infinite;

  @keyframes rotation {
    to {
      transform: rotate(360deg);
    }
  }

  .stop-start {
    stop-color: rgba(variables.$color-primary, 0);
  }

  .stop-end {
    stop-color: variables.$color-primary;
  }
}
</style>

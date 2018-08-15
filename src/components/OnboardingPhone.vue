<template>
  <div
    :class="{ bottom }"
    class="onboarding-phone"
  >
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bottom: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" scoped>
.onboarding-phone {
  background: url('../assets/onboarding/phone-top-mockup.svg') no-repeat top center;
  height: 271px;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;

  .content {
    width: 220px;
    box-sizing: border-box;
    margin: 65px auto 0 auto;
  }

  &.bottom {
    background-image: url('../assets/onboarding/phone-bottom-mockup.svg');
    flex-direction: column-reverse;

    .content {
      margin-top: 0;
      margin-bottom: 65px;
    }
  }
}
</style>

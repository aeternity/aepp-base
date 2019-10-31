<template>
  <div
    class="overlay"
    @click.self="$emit('click', $event)"
  >
    <slot />
  </div>
</template>

<script>
export default {
  mounted() {
    if (document.body.style.overflow) return;
    document.body.style.overflow = 'hidden';
    this.$once('hook:destroyed', () => { document.body.style.overflow = ''; });
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/functions';

.overlay {
  position: fixed;
  display: flex;
  padding: rem(20px);
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba($color-neutral-minimum, 0.7);
  overflow: auto;
}
</style>

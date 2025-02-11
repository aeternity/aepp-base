<template>
  <form class="url-form" novalidate @submit.prevent="submitHandler">
    <input
      :value="newUrl || currentUrl"
      :placeholder="$t('app.url-form-placeholder')"
      type="url"
      spellcheck="false"
      @input="inputHandler"
      @focus="focusHandler"
    />
  </form>
</template>

<script>
export default {
  props: {
    currentUrl: { type: String, default: '' },
  },
  data: () => ({ newUrl: '' }),
  methods: {
    submitHandler() {
      if (!this.newUrl) return;
      this.$emit('new-url');
      this.$router.push(`/browser/${this.newUrl}`);
      this.newUrl = '';
    },
    focusHandler({ target }) {
      target.setSelectionRange(0, target.value.length);
    },
    inputHandler(event) {
      this.newUrl = event.target.value;
      this.$emit('input', event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@use '../../styles/variables';
@use '../../styles/functions';
@use '../../styles/typography';

.url-form {
  input {
    width: 100%;
    padding: functions.rem(16px);
    box-sizing: border-box;
    border: none;
    background: transparent;
    @extend %face-sans-base;
    color: variables.$color-neutral-negative-3;

    &::placeholder {
      color: variables.$color-neutral;
    }

    &:focus {
      outline: none;
    }
  }
}
</style>

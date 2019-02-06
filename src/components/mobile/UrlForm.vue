<template>
  <form
    class="url-form"
    novalidate
    @submit.prevent="submitHandler"
  >
    <input
      :value="newUrl || currentUrl"
      placeholder="Search or type URL"
      type="url"
      spellcheck="false"
      @input="newUrl = $event.target.value"
      @focus="focusHandler"
    >
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
      this.$router.push(`/${this.newUrl.replace(/^https?:\/\//i, '')}`);
      this.newUrl = '';
    },
    focusHandler({ target }) {
      target.setSelectionRange(0, target.value.length);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';

.url-form {
  input {
    width: 100%;
    padding: rem(16px);
    box-sizing: border-box;
    border: none;
    background: transparent;
    @extend %face-sans-base;
    color: $color-neutral-negative-3;

    &::placeholder {
      color: $color-neutral;
    }

    &:focus {
      outline: none;
    }
  }
}
</style>

<template>
  <textarea
    v-if="type === 'textarea'"
    class="ae-input textarea"
    @input="handleInput"
  >{{value}}</textarea>
  <input
    v-else-if="type === 'password'"
    type="password"
    class="ae-input"
    @input="handleInput"
    :value="value"
  />
  <input v-else class="ae-input" @input="handleInput" :value="value" />
</template>

<script>
  export default {
    name: 'ae-input',
    props: {
      value: String,
      /**
       * Type of input, possible values: 'textarea', 'password'
       */
      type: {
        type: String,
        validator: (value) => {
          return ['textarea', 'password'].includes(value)
        }
      }
    },
    methods: {
      handleInput (inputEvent) {
        this.$emit('input', inputEvent.target.value)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '~@aeternity/aepp-components/dist/variables.scss';

  .ae-input {
    display: block;
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
    border: solid 2px $silver;
    padding: 14px 26px;
    margin: 10px 0 30px 0;

    font-family: Roboto Mono, monospace;
    font-weight: 500;
    line-height: 1.63;
    letter-spacing: 0.2px;
    color: $grey;
  }

  textarea.ae-input {
    min-height: 110px;
    max-height: 300px;
    resize: vertical;
  }
</style>

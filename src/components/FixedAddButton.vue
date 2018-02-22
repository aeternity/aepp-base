<template>
  <ae-button class="fixed-add-button" :to="to" @click="$emit('click')" type="dramatic">
    <ae-icon slot="icon" name="plus" invert type="exciting" />
  </ae-button>
</template>

<script>
  import { AeButton, AeIcon } from '@aeternity/aepp-components'

  export default {
    props: ['to'],
    components: { AeButton, AeIcon }
  }
</script>

<style lang="scss" scoped>
  @import '~@aeternity/aepp-components/dist/variables.scss';

  .fixed-add-button {
    position: fixed;
    bottom: 30px;
    right: 10px;

    @media (min-width: $screen-phone) {
      bottom: 50px;
      right: 50px;
    }
  }
</style>

<template>
  <ae-modal class="modal-page" :title="title" @close="closeHandler">
    <slot />
  </ae-modal>
</template>

<script>
  import { AeModal } from '@aeternity/aepp-components'

  export default {
    components: { AeModal },
    props: {
      title: String,
      redirectToOnClose: Object
    },
    methods: {
      closeHandler () {
        this.$emit('close')
        if (!this.redirectToOnClose) return
        this.$router.push(this.redirectToOnClose)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@aeternity/aepp-components/dist/variables.scss";

  .modal-page.ae-overlay {
    background: $smoke;

    /deep/ .ae-modal {
      padding-bottom: 60px;
    }
  }
</style>

<template>
  <ae-modal class="modal-screen" :title="title" @close="closeHandler">
    <main class="content">
      <slot />
    </main>

    <footer class="content">
      <slot name="footer" />
    </footer>
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
        if (!this.redirectToOnClose) return
        this.$router.push(this.redirectToOnClose)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@aeternity/aepp-components/dist/variables.scss';

  .modal-screen.ae-overlay {
    background: $smoke;

    /deep/ .ae-modal {
      height: 100%;
      max-height: 600px;
      display: flex;
      flex-direction: column;

      > main {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
      }
    }

    .content /deep/ {
      .ae-button {
        display: block;
        width: 100%;
        max-width: 310px;
        margin: 15px auto;

        .inner .label {
          margin: 0 auto;
        }
      }

      p {
        text-align: center;
        max-width: 300px;
        font-size: 18px;
        line-height: 1.56;
        margin-left: auto;
        margin-right: auto;
      }
    }

    main.content {
      flex-grow: 1;
    }

    footer.content /deep/ p {
      color: $grey;
      font-size: 16px;
    }
  }
</style>

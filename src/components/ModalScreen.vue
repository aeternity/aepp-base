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
        this.$router.push(this.redirectToOnClose)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@aeternity/aepp-components/dist/variables.scss';

  .modal-screen.ae-overlay {
    background: $smoke;

    main {
      flex-grow: 1;
    }
  }
</style>

<style lang="scss">
  @import '~@aeternity/aepp-components/dist/variables.scss';

  .modal-screen {
    .ae-modal > main {
      box-sizing: border-box;
      @media (max-width: $screen-phone) {
        height: calc(100vh - 85px);
      }
      @media (min-width: $screen-phone) {
        height: calc(100vh - 20px);
      }
      max-height: 600px;
      display: flex;
      flex-direction: column;

      .content {
        .ae-button {
          display: block;
          width: 100%;
          max-width: 310px;
          margin: 15px auto;
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

      footer.content p {
        color: $grey;
        font-size: 16px;
      }
    }

    .ae-button .inner .label {
      margin: 0 auto;
    }
  }
</style>

<template>
  <modal-screen
    class="address-book-no-contacts"
    title="Æddress Book"
    :redirectToOnClose="{ name: 'apps' }"
  >
    <ae-divider />
    <div class="no-contacts">
      No saved contacts.
    </div>
  </modal-screen>
</template>

<script>
  import { AeDivider } from '@aeternity/aepp-components'
  import ModalScreen from '@/components/ModalScreen.vue'

  export default {
    components: { AeDivider, ModalScreen }
  }
</script>

<style lang="scss">
  @import '~@aeternity/aepp-components/dist/variables.scss';

  .address-book-no-contacts.modal-screen.ae-overlay .ae-modal main.content {
    display: flex;
    flex-direction: column;

    .no-contacts {
      margin: auto;
      font-family: 'Roboto Mono', monospace;
      font-weight: 500;
      color: $grey;
    }
  }
</style>

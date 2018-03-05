<template>
  <div>
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

    <fixed-add-button quick-id :to="{ name: 'address-book-new' }" />
    <quick-id />
  </div>
</template>

<script>
  import { AeDivider } from '@aeternity/aepp-components'
  import ModalScreen from '@/components/ModalScreen.vue'
  import FixedAddButton from '@/components/FixedAddButton.vue'
  import QuickId from '@/components/QuickId/QuickId.vue'

  export default {
    components: { AeDivider, ModalScreen, FixedAddButton, QuickId }
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

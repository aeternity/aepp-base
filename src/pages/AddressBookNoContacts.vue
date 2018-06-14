<template>
  <div>
    <modal-screen
      class="address-book-no-contacts"
      title="Addresses"
      :redirectToOnClose="{ name: 'apps' }"
    >
      <ae-divider />
      <div class="no-contacts">
        No saved contacts.
      </div>
    </modal-screen>

    <fixed-add-button quick-id :to="{ name: 'address-book-new' }" />
  </div>
</template>

<script>
import { AeDivider } from '@aeternity/aepp-components'
import ModalScreen from '@/components/ModalScreen.vue'
import FixedAddButton from '@/components/FixedAddButton.vue'

export default {
  components: { AeDivider, ModalScreen, FixedAddButton }
}
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components/dist/variables.scss';

.address-book-no-contacts.modal-screen {
  /deep/ .ae-modal main.content {
    display: flex;
    flex-direction: column;
  }

  .no-contacts {
    margin: auto;
    font-family: 'Roboto Mono', monospace;
    font-weight: 500;
    color: $grey;
  }
}
</style>

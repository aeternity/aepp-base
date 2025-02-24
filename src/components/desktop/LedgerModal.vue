<template>
  <Modal class="ledger-modal" v-bind="$attrs" v-on="$listeners">
    <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot" />

    <img slot="logo" src="../../assets/ledger-logo.svg" />
  </Modal>
</template>

<script>
import Modal from './Modal.vue';

export default {
  components: { Modal },
};
</script>

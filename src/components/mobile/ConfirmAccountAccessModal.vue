<template>
  <Modal class="confirm-account-access-modal">
    <ConfirmAccountAccess v-bind="$attrs" />

    <TabBar slot="footer" />
  </Modal>
</template>

<script>
import Modal from './Modal.vue';
import ConfirmAccountAccess from '../ConfirmAccountAccess.vue';
import TabBar from './TabBar.vue';

export default {
  components: {
    Modal,
    ConfirmAccountAccess,
    TabBar,
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/globals/functions.scss';

.confirm-account-access-modal {
  padding-bottom: rem(70px + 28px + 20px);

  /deep/ .modal-plain {
    max-width: rem(315px);
  }

  .tab-bar {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
</style>

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
@use '../../styles/functions';

.confirm-account-access-modal {
  padding-bottom: functions.rem(70px + 28px + 20px);

  ::v-deep .modal-plain {
    max-width: functions.rem(315px);
  }

  .tab-bar {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
</style>

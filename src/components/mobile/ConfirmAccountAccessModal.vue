<template>
  <ae-modal class="confirm-account-access-modal">
    <guide>
      {{ appName }}
      <br>requests access to
      <br><ae-identicon
        :address="activeIdentity.address"
        size="s"
      /> {{ activeIdentity.name }}
    </guide>

    <confirm-modal-permission name="Accessing accounts">
      This aepp will be able to read your public key
    </confirm-modal-permission>

    <confirm-modal-permission name="Preparing transactions">
      This allows this app to prepare a transaction.
      You will need to sign the transaction manually.
    </confirm-modal-permission>

    <ae-button-group>
      <ae-button
        fill="secondary"
        @click="denyHandler"
      >
        Deny
      </ae-button>
      <ae-button @click="allowHandler">
        Allow
      </ae-button>
    </ae-button-group>
  </ae-modal>
</template>

<script>
import { mapGetters } from 'vuex';
import { AeIdenticon } from '@aeternity/aepp-components-3';
import AeModal from '../AeModal.vue';
import ConfirmModalPermission from './ConfirmModalPermission.vue';
import Guide from '../Guide.vue';
import AeButton from '../AeButton.vue';
import AeButtonGroup from '../AeButtonGroup.vue';

export default {
  components: {
    AeModal,
    Guide,
    AeIdenticon,
    ConfirmModalPermission,
    AeButtonGroup,
    AeButton,
  },
  props: {
    appName: { type: String, required: true },
    resolve: { type: Function, required: true },
    reject: { type: Function, required: true },
  },
  computed: mapGetters(['activeIdentity']),
  methods: {
    denyHandler() {
      this.reject(new Error('Rejected by user'));
    },
    allowHandler() {
      this.resolve();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.confirm-account-access-modal.ae-modal {
  background-color: rgba($color-neutral-positive-2, 0.8);

  /deep/ .modal {
    max-width: rem(250px);
    padding: rem(32px);
  }

  .ae-button-group {
    margin-left: rem(-16px);
    margin-top: rem(16px);
    margin-right: rem(-16px);
  }
}
</style>

<template>
  <mobile-page fill="primary">
    <guide fill="neutral">
      <em>Call contract method</em>
      <br>by
      <ae-identicon
        :address="activeIdentity.address"
        size="s"
      />
      {{ ' ' }}
      <em>{{ activeIdentity.name }}</em>
    </guide>

    <confirm-modal-address
      name="Contract address"
      :address="contractAddress"
    />

    <confirm-modal-field
      name="Method name"
      :value="methodName"
    />

    <confirm-modal-field
      name="Method arguments"
      :value="methodArguments"
    />

    <ae-button-group slot="footer">
      <ae-button
        fill="light"
        @click="denyHandler"
      >
        Cancel
      </ae-button>
      <ae-button
        fill="secondary"
        @click="allowHandler"
      >
        Confirm
      </ae-button>
    </ae-button-group>
  </mobile-page>
</template>

<script>
import { mapGetters } from 'vuex';
import { AeIdenticon } from '@aeternity/aepp-components-3';
import MobilePage from './Page.vue';
import Guide from '../Guide.vue';
import ConfirmModalField from './ConfirmModalField.vue';
import ConfirmModalAddress from './ConfirmModalAddress.vue';
import AeButton from '../AeButton.vue';
import AeButtonGroup from '../AeButtonGroup.vue';

export default {
  components: {
    MobilePage,
    Guide,
    AeIdenticon,
    ConfirmModalField,
    ConfirmModalAddress,
    AeButton,
    AeButtonGroup,
  },
  props: {
    resolve: { type: Function, required: true },
    reject: { type: Function, required: true },
    contractAddress: { type: String, required: true },
    methodName: { type: String, required: true },
    methodArguments: { type: String, required: true },
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

<template>
  <mobile-page fill="primary">
    <guide fill="neutral">
      <em>Create a new contract</em>
      <br>by
      <ae-identicon
        :address="activeIdentity.address"
        size="s"
      />
      {{ ' ' }}
      <em>{{ activeIdentity.name }}</em>
    </guide>

    <confirm-modal-raw-data
      name="Contract compiled code"
      :data="contractByteCode"
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
import ConfirmModalRawData from './ConfirmModalRawData.vue';
import AeButton from '../AeButton.vue';
import AeButtonGroup from '../AeButtonGroup.vue';

export default {
  components: {
    MobilePage,
    Guide,
    AeIdenticon,
    ConfirmModalRawData,
    AeButton,
    AeButtonGroup,
  },
  props: {
    resolve: { type: Function, required: true },
    reject: { type: Function, required: true },
    contractByteCode: { type: String, required: true },
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

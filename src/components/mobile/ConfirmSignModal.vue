<template>
  <Page
    :modal="!$globals.ENV_MOBILE_DEVICE"
    fill="primary"
    hide-tab-bar
    right-button-icon-name="close"
    @right-button-click="denyHandler"
  >
    <Guide :template="$t('modal.confirm-sign.guide')" fill="neutral">
      <AccountInline slot="address" :address="activeAccount.address" />
    </Guide>

    <DetailsRawData :name="$t('modal.confirm-sign.data')" :data="data" />

    <AeButtonGroup slot="footer">
      <AeButton fill="light" @click="denyHandler">
        {{ $t('cancel') }}
      </AeButton>
      <AeButton fill="secondary" @click="allowHandler">
        {{ $t('confirm') }}
      </AeButton>
    </AeButtonGroup>
  </Page>
</template>

<script>
import { mapGetters } from 'vuex';
import Page from '../Page.vue';
import Guide from '../Guide.vue';
import AccountInline from '../AccountInline.vue';
import DetailsRawData from './DetailsRawData.vue';
import AeButton from '../AeButton.vue';
import AeButtonGroup from '../AeButtonGroup.vue';

export default {
  components: {
    Page,
    Guide,
    AccountInline,
    DetailsRawData,
    AeButton,
    AeButtonGroup,
  },
  props: {
    resolve: { type: Function, required: true },
    reject: { type: Function, required: true },
    data: { type: [String, Uint8Array], required: true },
  },
  computed: mapGetters({ activeAccount: 'accounts/active' }),
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

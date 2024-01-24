<template>
  <div class="confirm-account-access">
    <Guide :template="$t('app.browser.confirm-account-access.guide')">
      <template slot="app">
        <img
          v-if="app.icon"
          :src="app.icon"
        > {{ app.name }}
      </template>
      <AccountInline
        slot="account"
        :address="activeAccount.address"
      />
    </Guide>

    <DetailsAccountAccessPermission :app-name="app.name" />

    <AeButtonGroup>
      <AeButton
        fill="secondary"
        @click="denyHandler"
      >
        {{ $t('deny') }}
      </AeButton>
      <AeButton @click="allowHandler">
        {{ $t('allow') }}
      </AeButton>
    </AeButtonGroup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DetailsAccountAccessPermission from './mobile/DetailsAccountAccessPermission.vue';
import Guide from './Guide.vue';
import AccountInline from './AccountInline.vue';
import AeButton from './AeButton.vue';
import AeButtonGroup from './AeButtonGroup.vue';

export default {
  components: {
    Guide,
    AccountInline,
    DetailsAccountAccessPermission,
    AeButtonGroup,
    AeButton,
  },
  props: {
    appHost: { type: String, required: true },
    resolve: { type: Function, required: true },
    reject: { type: Function, required: true },
  },
  computed: {
    ...mapGetters({ activeAccount: 'accounts/active' }),
    app() {
      return this.$store.getters['appsMetadata/get'](this.appHost);
    },
  },
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
@use '../styles/variables';
@use '../styles/functions';

.confirm-account-access {
  padding: functions.rem(32px);

  .details-account-access-permission {
    --color-primary: #{variables.$color-neutral-negative-3};
    --color-secondary: #{variables.$color-neutral};
  }

  .ae-button-group {
    margin-left: functions.rem(-16px);
    margin-top: functions.rem(16px);
    margin-right: functions.rem(-16px);
  }
}
</style>

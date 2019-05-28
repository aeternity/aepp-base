<template>
  <div class="confirm-account-access">
    <Guide>
      <img
        v-if="app.icon"
        :src="app.icon"
      > {{ app.name }}
      <br>requests access to
      <br><AccountInline :address="activeAccount.address" />
    </Guide>

    <DetailsAccountAccessPermission :app-name="app.name" />

    <AeButtonGroup>
      <AeButton
        fill="secondary"
        @click="denyHandler"
      >
        Deny
      </AeButton>
      <AeButton @click="allowHandler">
        Allow
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
      return this.$store.getters.getAppMetadata(this.appHost);
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
@import '../styles/globals/functions.scss';
@import '../styles/variables/colors.scss';

.confirm-account-access {
  padding: rem(32px);

  .details-account-access-permission {
    --color-primary: #{$color-neutral-negative-3};
    --color-secondary: #{$color-neutral};
  }

  .ae-button-group {
    margin-left: rem(-16px);
    margin-top: rem(16px);
    margin-right: rem(-16px);
  }
}
</style>

<template>
  <MobilePage
    :header-fill="accountModule.account.color"
    right-button-icon-name="close"
    @right-button-click="() => $router.back()"
  >
    <template slot="header">
      <Guide fill="neutral">
        <em>Create new {{ accountName }}</em>
        <br>choose a name
      </Guide>

      <form
        :id="_uid"
        @submit.prevent="handleAddAddress"
      >
        <AeInput
          v-model="newAccountName"
          v-validate="'required'"
          autofocus
          autocomplete="off"
          :error="errors.has('newAccountName')"
          :footer="errors.first('newAccountName')"
          name="newAccountName"
          header="Name"
          placeholder="Name"
          maxlength="16"
        />
      </form>
    </template>

    <AeButton
      fill="secondary"
      :form="_uid"
    >
      Create
    </AeButton>
  </MobilePage>
</template>

<script>
import { mapState } from 'vuex';
import AeInput from '../../components/AeInput.vue';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: {
    AeButton,
    MobilePage,
    AeInput,
    Guide,
  },
  data: () => ({
    newAccountName: '',
    redirected: false,
  }),
  computed: {
    ...mapState('accounts', {
      accountModule(state, { getModule }) {
        return getModule({ source: { type: this.$route.meta.accountType } });
      },
    }),
    accountName() {
      if (this.$route.meta.accountType === 'air-gap') return 'Vault';
      return 'subaccount';
    },
  },
  methods: {
    async handleAddAddress() {
      if (!await this.$validator.validateAll()) return;
      await this.$store.dispatch(`accounts/${this.accountModule.name}/create`, this.newAccountName);
      if (!this.redirected) this.$router.back();
    },
  },
  beforeRouteLeave(to, from, next) {
    this.redirected = true;
    next();
  },
};
</script>

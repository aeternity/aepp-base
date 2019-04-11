<template>
  <MobilePage
    :header-fill="secure ? 'alternative' : 'primary'"
    right-button-icon-name="close"
    @right-button-click="$router.back()"
  >
    <template slot="header">
      <Guide fill="neutral">
        <em>Create new {{ secure ? 'Vault' : 'subaccount' }}</em>
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
  }),
  computed: {
    secure() {
      return this.$route.meta.secure;
    },
  },
  methods: {
    async handleAddAddress() {
      if (!await this.$validator.validateAll()) return;
      if (this.secure) {
        this.$router.push({ name: 'vault-setup-method' });
        return;
      }
      this.$store.commit('createIdentity', this.newAccountName);
      await new Promise((resolve) => {
        const unsubscribe = this.$store.subscribe(({ type }) => {
          if (type !== 'setAccounts') return;
          unsubscribe();
          resolve();
        });
      });
      this.$store.commit('selectIdentity', this.$store.state.mobile.accountCount - 1);
      this.$router.back();
    },
  },
};
</script>

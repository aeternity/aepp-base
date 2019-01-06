<template>
  <mobile-page
    header-fill="primary"
    right-button-icon-name="close"
    @right-button-click="$router.back()"
  >
    <template slot="header">
      <guide fill="neutral">
        <em>Create new subaccount</em>
        <br>and name it
      </guide>

      <form
        :id="_uid"
        @submit.prevent="handleAddAddress"
      >
        <ae-input
          v-model="newAccountName"
          v-validate="'required'"
          autofocus
          :error="errors.has('newAccountName')"
          :footer="errors.first('newAccountName')"
          name="newAccountName"
          header="Name"
          placeholder="Name"
        />
      </form>
    </template>

    <ae-button
      fill="secondary"
      :form="_uid"
    >
      Create
    </ae-button>
  </mobile-page>
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
  methods: {
    async handleAddAddress() {
      if (!await this.$validator.validateAll()) return;
      this.$store.commit('createIdentity', this.newAccountName);
      this.$store.commit('selectIdentity', this.$store.state.mobile.accountCount - 1);
      this.$router.back();
    },
  },
};
</script>

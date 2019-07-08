<template>
  <MobilePage
    :header-fill="activeColor"
    right-button-icon-name="close"
    :right-button-to="{ name: 'name-list' }"
  >
    <template slot="header">
      <Guide fill="neutral">
        <em>Claim a name</em> for
        <AccountInline :address="active.address" />
      </Guide>

      <form
        :id="_uid"
        @submit.prevent="handleSubmit"
      >
        <AeInput
          v-model="name"
          v-validate="'required|aens_name|aens_name_unregistered'"
          autofocus
          autocomplete="off"
          :error="errors.has('name') || error"
          :footer="errors.first('name') || (error ? 'Unknown error' : '')"
          :disabled="busy"
          name="name"
          header="Name"
          placeholder="Name.test"
          maxlength="16"
          @input="error = false"
        />
      </form>
    </template>

    <AeButton
      fill="secondary"
      :form="_uid"
      :disabled="busy || errors.has('name') || error"
    >
      Register
    </AeButton>
  </MobilePage>
</template>

<script>
import { mapGetters } from 'vuex';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeInput from '../../components/AeInput.vue';
import AccountInline from '../../components/AccountInline.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: {
    MobilePage,
    Guide,
    AeInput,
    AccountInline,
    AeButton,
  },
  data: () => ({ name: '', busy: false, error: false }),
  computed: mapGetters('accounts', ['active', 'activeColor']),
  methods: {
    async handleSubmit() {
      if (!await this.$validator.validateAll()) return;
      this.busy = true;
      let claimTxHash;

      try {
        const { salt } = await this.$store.state.sdk.aensPreclaim(this.name);
        claimTxHash = (
          await this.$store.state.sdk.aensClaim(this.name, salt, { waitMined: false })
        ).hash;

        this.$store.dispatch('modals/open', {
          name: 'notification',
          text: `Claim for ${this.name} name was successfully sent`,
        });
        this.$router.back();
      } catch (e) {
        if (e.message === 'Rejected by user') return;
        this.error = true;
        throw e;
      } finally {
        this.busy = false;
      }

      try {
        await this.$store.state.sdk.poll(claimTxHash);
        await this.$store.state.sdk.aensUpdate(
          (await this.$store.state.sdk.aensQuery(this.name)).id,
          this.$store.getters['accounts/active'].address,
        );
        this.$store.dispatch('modals/open', {
          name: 'notification',
          text: `${this.name} was successfully registered`,
        });
      } catch (e) {
        if (e.message === 'Rejected by user') return;
        this.$store.dispatch('modals/open', {
          name: 'notification',
          text: `${this.name} was not registered for unknown reason`,
        });
        throw e;
      }
    },
  },
};
</script>

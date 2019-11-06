<template>
  <MobilePage
    :header-fill="activeColor"
    right-button-icon-name="close"
    :right-button-to="{ name: 'name-list' }"
  >
    <template slot="header">
      <Guide
        :template="$t('name.new.guide')"
        fill="neutral"
      >
        <AccountInline
          slot="inlineAccount"
          :address="active.address"
        />
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
          :footer="errors.first('name') || (error ? t('name.new.unknown-error') : '')"
          :disabled="busy"
          name="name"
          :header="$t('name.new.name')"
          :placeholder="$t('name.new.name-placeholder')"
          @input="error = false"
        />
      </form>
    </template>

    <AeButton
      fill="secondary"
      :form="_uid"
      :spinner="busy"
      :disabled="busy || errors.has('name') || error"
    >
      {{ $t('name.new.register') }}
    </AeButton>
  </MobilePage>
</template>

<script>
import { mapGetters } from 'vuex';
import { MAX_AUCTION_NAME_LENGTH } from '../../lib/constants';
import { handleUnknownError } from '../../lib/utils';
import { i18n } from '../../store/plugins/ui/languages';
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
          text: this.$t('name.new.notification.claim-sent', { name: this.name }),
        });
        this.$router.push({ name: 'name-list-personal' });
      } catch (e) {
        if (e.message === 'Rejected by user') return;
        this.error = true;
        handleUnknownError(e);
      } finally {
        this.busy = false;
      }

      try {
        this.$store.dispatch('names/fetchOwned');
        await this.$store.state.sdk.poll(claimTxHash);
        if (MAX_AUCTION_NAME_LENGTH < this.name.length) {
          await this.$store.state.sdk.aensUpdate(
            (await this.$store.state.sdk.api.getNameEntryByName(this.name)).id,
            this.$store.getters['accounts/active'].address,
          );
        }
        this.$store.dispatch('modals/open', {
          name: 'notification',
          text: i18n.t('name.new.notification.registered', { name: this.name }),
        });
      } catch (e) {
        if (e.message === 'Rejected by user') return;
        this.$store.dispatch('modals/open', {
          name: 'notification',
          text: i18n.t('name.new.notification.unknown-error', { name: this.name }),
        });
        handleUnknownError(e);
      } finally {
        this.$store.dispatch('names/fetchOwned');
      }
    },
  },
};
</script>

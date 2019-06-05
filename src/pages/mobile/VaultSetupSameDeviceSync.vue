<template>
  <MobilePage
    class="vault-setup-same-device-sync"
    hide-tab-bar
    left-button-icon-name="back"
    right-button-icon-name="close"
    :left-button-to="{ name: 'vault-setup-same-device' }"
    :right-button-to="{ name: 'apps' }"
  >
    <template slot="title">
      AirGap Setup
      <AeFraction
        numerator="3"
        denominator="3"
      />
    </template>
    <Guide fill="alternative">
      <AeFraction
        slot="icon"
        numerator="3"
        denominator="3"
      />
      <em>Vault sync on the way</em>
      <br>Paste the sync code below.
    </Guide>

    <form
      :id="_uid"
      @submit.prevent="createAccount"
    >
      <AeTextarea
        v-model="responseUrl"
        v-validate="'required|air_gap_response_url'"
        header="AirGap Sync Code"
        rows="3"
        submit-on-enter
        autofocus
        :error="errors.has('responseUrl')"
        :footer="errors.first('responseUrl')"
      />
    </form>

    <AeButton
      slot="footer"
      :disabled="errors.any()"
      :form="_uid"
      fill="alternative"
    >
      Sync
    </AeButton>
  </MobilePage>
</template>

<script>
import MobilePage from '../../components/mobile/Page.vue';
import AeFraction from '../../components/AeFraction.vue';
import Guide from '../../components/Guide.vue';
import AeTextarea from '../../components/AeTextarea.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: {
    MobilePage, AeFraction, Guide, AeTextarea, AeButton,
  },
  data: () => ({ responseUrl: '' }),
  methods: {
    async createAccount() {
      if (!await this.$validator.validateAll()) return;

      this.$store.dispatch('accounts/airGap/createByResponseUrl', { responseUrl: this.responseUrl });
      this.$router.push({ name: 'vault-setup-completed' });
    },
  },
};
</script>

<style lang="scss" src="./VaultSetup.scss" scoped />

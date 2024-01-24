<template>
  <Page
    :right-button-to="{ name: 'settings' }"
    right-button-icon-name="close"
    class="settings-mnemonic-confirmed"
    :title="$t('settings.mnemonic.title')"
    hide-tab-bar
  >
    <Guide :template="$t('settings.mnemonic.confirmed.guide')">
      <AeFraction
        slot="icon"
        numerator="4"
        denominator="4"
      />
    </Guide>

    <template slot="footer">
      <AeButton @click="deleteMnemonic">
        {{ $t('settings.mnemonic.confirmed.delete') }}
      </AeButton>

      <AeButton
        :to="{ name: 'settings' }"
        fill="secondary"
      >
        {{ $t('settings.mnemonic.confirmed.keep') }}
      </AeButton>
    </template>
  </Page>
</template>

<script>
import Page from '../../components/Page.vue';
import Guide from '../../components/Guide.vue';
import AeFraction from '../../components/AeFraction.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: {
    Page, Guide, AeFraction, AeButton,
  },
  methods: {
    async deleteMnemonic() {
      await this.$store.dispatch('accounts/hdWallet/deleteMnemonic');
      this.$router.push({ name: 'settings' });
    },
  },
};
</script>

<style lang="scss" scoped>
@use '../../styles/functions';

.settings-mnemonic-confirmed .ae-button {
  margin-top: functions.rem(12px);
}
</style>

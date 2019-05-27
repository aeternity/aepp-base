<template>
  <MobilePage
    :right-button-to="{ name: 'settings' }"
    right-button-icon-name="close"
    class="settings-mnemonic-confirmed"
    title="Backup Recovery Phrase"
    hide-tab-bar
  >
    <Guide>
      <AeFraction
        slot="icon"
        numerator="4"
        denominator="4"
      />
      Would you like to <em>delete the recovery phrase</em> from this device?
      This will provide <strong>extra security</strong>… but it cannot be undone.
    </Guide>

    <template slot="footer">
      <AeButton @click="deleteMnemonic">
        Delete Recovery Phrase
      </AeButton>

      <AeButton
        :to="{ name: 'settings' }"
        fill="secondary"
      >
        Keep Recovery Phrase
      </AeButton>
    </template>
  </MobilePage>
</template>

<script>
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeFraction from '../../components/AeFraction.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: {
    MobilePage, Guide, AeFraction, AeButton,
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
@import '../../styles/globals/functions.scss';

.settings-mnemonic-confirmed .ae-button {
  margin-top: rem(12px);
}
</style>

<template>
  <MobilePage
    :right-button-to="{ name: 'settings' }"
    right-button-icon-name="close"
    title="Backup Recovery Phrase"
    hide-tab-bar
  >
    <Guide>
      <AeFraction
        slot="icon"
        numerator="1"
        denominator="4"
      />
      <mark>Check the spelling</mark>
      of each word and <em>never</em>
      create a screenshot
      or photo of this phrase.
    </Guide>

    <AeButton
      slot="footer"
      :to="{ name: 'settings-mnemonic-show' }"
      fill="secondary"
    >
      Show Recovery Phrase
    </AeButton>
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
};
</script>

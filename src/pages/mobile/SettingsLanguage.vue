<template>
  <MobilePage
    :left-button-to="{ name: 'settings' }"
    left-button-icon-name="back"
    :title="$t('settings.language')"
    header-fill="light"
    fill="neutral"
  >
    <AeCard fill="maximum">
      <LanguageSwitcher />
    </AeCard>
  </MobilePage>
</template>

<script>
import MobilePage from '../../components/mobile/Page.vue';
import AeCard from '../../components/AeCard.vue';
import LanguageSwitcher from '../../components/LanguageSwitcher.vue';

export default {
  components: {
    MobilePage,
    AeCard,
    LanguageSwitcher,
  },
};
</script>

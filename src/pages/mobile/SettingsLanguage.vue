<template>
  <Page
    :left-button-to="{ name: 'settings' }"
    left-button-icon-name="back"
    :title="$t('settings.language')"
    header-fill="light"
    fill="neutral"
  >
    <AeCard fill="maximum">
      <LanguageSwitcher />
    </AeCard>
  </Page>
</template>

<script>
import Page from '../../components/Page.vue';
import AeCard from '../../components/AeCard.vue';
import LanguageSwitcher from '../../components/LanguageSwitcher.vue';

export default {
  components: {
    Page,
    AeCard,
    LanguageSwitcher,
  },
};
</script>

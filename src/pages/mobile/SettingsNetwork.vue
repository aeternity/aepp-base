<template>
  <Page
    :left-button-to="{ name: 'settings' }"
    left-button-icon-name="back"
    :title="$t('network.settings.title')"
    header-fill="light"
    fill="neutral"
  >
    <AeCard fill="maximum">
      <NetworkSwitcher :network-add-button-to="{ name: 'settings-network-new' }" />
    </AeCard>
  </Page>
</template>

<script>
import Page from '../../components/Page.vue';
import AeCard from '../../components/AeCard.vue';
import NetworkSwitcher from '../../components/NetworkSwitcher.vue';

export default {
  components: {
    Page,
    AeCard,
    NetworkSwitcher,
  },
};
</script>

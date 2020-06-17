<template>
  <Page
    :left-button-to="{ name: 'settings-network' }"
    left-button-icon-name="back"
    :title="$t('network.settings.new.title')"
    header-fill="light"
    fill="neutral"
  >
    <AeCard fill="maximum">
      <NetworkAdd :finally-to="{ name: 'settings-network' }" />
    </AeCard>
  </Page>
</template>

<script>
import Page from '../../components/Page.vue';
import AeCard from '../../components/AeCard.vue';
import NetworkAdd from '../../components/NetworkAdd.vue';

export default {
  components: {
    Page,
    AeCard,
    NetworkAdd,
  },
};
</script>

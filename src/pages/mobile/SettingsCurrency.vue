<template>
  <Page
    class="settings-currency"
    :left-button-to="{ name: 'settings' }"
    left-button-icon-name="back"
    :title="$t('settings.currency.title')"
    header-fill="light"
    fill="neutral"
  >
    <AeCard fill="maximum">
      <CurrencySwitcher />
    </AeCard>
    <AeCard
      class="use-as-main"
      fill="maximum"
    >
      <ListItem :title="$t('settings.currency.use-as-main')">
        <AeRadio
          slot="right"
          checkbox
          :checked="swapped"
          @change="swapCurrencies"
        />
      </ListItem>
    </AeCard>
  </Page>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Page from '../../components/Page.vue';
import AeCard from '../../components/AeCard.vue';
import CurrencySwitcher from '../../components/CurrencySwitcher.vue';
import ListItem from '../../components/ListItem.vue';
import AeRadio from '../../components/AeRadio.vue';

export default {
  components: {
    Page,
    AeCard,
    CurrencySwitcher,
    ListItem,
    AeRadio,
  },
  computed: mapState('currencies', ['swapped']),
  methods: mapMutations('currencies', ['swapCurrencies']),
};
</script>

<style lang="scss" scoped>
@use '../../styles/functions';

.settings-currency .use-as-main {
  margin-top: functions.rem(20px);
}
</style>

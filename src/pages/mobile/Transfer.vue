<template>
  <MobilePage
    class="transfer"
    header-fill="neutral"
    :right-button-icon-name="`${tooltipsVisible ? 'close' : 'question'}-circle`"
    :right-button-color="tooltipsVisible ? 'primary' : ''"
    @right-button-click="showTooltips"
  >
    <template slot="header">
      <Guide :template=" $t('transfer.guide')" />

      <AeAccount v-bind="activeAccount" />
    </template>

    <ListItem
      :to="{ name: 'send' }"
      :title="$t('transfer.send.title')"
      :subtitle="$t('transfer.send.subtitle')"
      border-dark
    >
      <LeftMore slot="right" />
    </ListItem>
    <ListItem
      :to="{ name: 'receive' }"
      :title="$t('transfer.receive.title')"
      :subtitle="$t('transfer.receive.subtitle')"
      border-dark
    >
      <LeftMore slot="right" />
    </ListItem>
    <ListItem
      :to="{ name: 'transaction-list' }"
      :title="$t('transfer.transaction.title')"
      :subtitle="$t('transfer.transaction.subtitle')"
      border-dark
    >
      <LeftMore slot="right" />
    </ListItem>
    <ListItem
      :title="$t('transfer.migrated-balance.title')"
      :subtitle="$t('transfer.migrated-balance.subtitle')"
      border-dark
      @click="open({ name: 'migratedBalance' })"
    >
      <LeftMore slot="right" />
    </ListItem>
  </MobilePage>
</template>

<script>
import { pick } from 'lodash-es';
import { mapActions } from 'vuex';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeAccount from '../../components/AeAccount.vue';
import { LeftMore } from '../../components/icons';
import ListItem from '../../components/ListItem.vue';

export default {
  components: {
    MobilePage,
    Guide,
    AeAccount,
    ListItem,
    LeftMore,
  },
  data: () => ({
    tooltipsVisible: false,
  }),
  subscriptions() {
    return pick(this.$store.state.observables, ['activeAccount']);
  },
  methods: {
    ...mapActions('modals', ['open']),
    async showTooltips() {
      this.tooltipsVisible = true;
      await this.open({
        name: 'showTooltips',
        tooltips: this.$t('transfer.tooltips'),
      });
      this.tooltipsVisible = false;
    },
  },
};
</script>

<template>
  <MobilePage
    :left-button-to="{ name: 'settings' }"
    left-button-icon-name="back"
    :title="$t('settings.info.title')"
    header-fill="light"
    fill="neutral"
  >
    <AeCard fill="maximum">
      <ListItem
        v-for="(field, idx) in infoFields"
        :key="idx"
        :subtitle="field.subtitle || ''"
        :title="field.name"
      >
        <template slot="right">
          {{ field.value }}
        </template>
      </ListItem>
    </AeCard>
  </MobilePage>
</template>

<script>
import { pick } from 'lodash-es';
import { mapGetters } from 'vuex';
import MobilePage from '../../components/mobile/Page.vue';
import AeCard from '../../components/AeCard.vue';
import ListItem from '../../components/ListItem.vue';

export default {
  components: {
    MobilePage,
    AeCard,
    ListItem,
  },
  data: () => ({
    nodeVersion: null,
    compilerVersion: null,
  }),
  subscriptions() {
    return pick(this.$store.state.observables, ['middlewareStatus']);
  },
  computed: {
    ...mapGetters(['currentNetwork']),
    infoFields() {
      return [{
        name: this.$t('settings.info.version'),
        value: process.env.npm_package_version,
      }, {
        name: this.$t('settings.info.node-version'),
        value: this.nodeVersion,
      }, {
        name: this.$t('settings.info.compiler-version'),
        value: this.compilerVersion,
      }, {
        name: this.$t('settings.info.compiler-url'),
        subtitle: this.currentNetwork.compilerUrl,
      }, {
        name: this.$t('settings.info.sdk-version'),
        value: process.env.SDK_VERSION,
      }, {
        name: this.$t('settings.info.middleware-url'),
        subtitle: this.currentNetwork.middlewareUrl,
      },
      ...this.middlewareStatus.OK ? [] : [{
        name: this.$t('settings.info.blocks-in-queue'),
        value: this.middlewareStatus.queueLength,
      }]];
    },
  },
  async mounted() {
    if (this.$store.state.sdk.then) await this.$store.state.sdk;
    this.compilerVersion = this.$store.state.sdk.compilerVersion;
    this.nodeVersion = this.$store.state.sdk.selectedNode.version;
  },
};
</script>

<template>
  <Page
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
  </Page>
</template>

<script>
import { pick } from 'lodash-es';
import { mapState } from 'vuex';
import Page from '../../components/Page.vue';
import AeCard from '../../components/AeCard.vue';
import ListItem from '../../components/ListItem.vue';

export default {
  components: {
    Page,
    AeCard,
    ListItem,
  },
  subscriptions() {
    return pick(this.$store.state.observables, ['topBlockHeight', 'middlewareStatus']);
  },
  computed: mapState({
    infoFields({ sdk }, { currentNetwork }) {
      return [{
        name: this.$t('settings.info.version'),
        value: process.env.npm_package_version,
      }, {
        name: this.$t('settings.info.sdk-version'),
        value: process.env.SDK_VERSION,
      }, {
        name: this.$t('settings.info.node.url'),
        subtitle: currentNetwork.url,
      }, {
        name: this.$t('settings.info.node.version'),
        value: sdk?.selectedNode?.version,
      }, {
        name: this.$t('settings.info.node.height'),
        value: this.topBlockHeight,
      }, {
        name: this.$t('settings.info.compiler.url'),
        subtitle: currentNetwork.compilerUrl,
      }, {
        name: this.$t('settings.info.compiler.version'),
        value: sdk?.compilerVersion,
      }, {
        name: this.$t('settings.info.middleware.url'),
        subtitle: currentNetwork.middlewareUrl,
      }, {
        name: this.$t('settings.info.middleware.version'),
        value: this.middlewareStatus?.mdwVersion,
      }, {
        name: this.$t('settings.info.middleware.height'),
        value: this.middlewareStatus?.mdwHeight,
      }];
    },
  }),
};
</script>

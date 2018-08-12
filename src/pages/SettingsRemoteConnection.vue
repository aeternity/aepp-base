<template>
  <mobile-page
    :redirect-to-on-close="{ name: 'settings' }"
    title="Remote Connection"
    back-button
    class="settings"
  >
    <heading>Connected devices</heading>
    <item
      v-for="f in followers"
      :key="f.id"
      inactive>
      <div class="follower">
        <span class="name">{{ f.name }}</span><br >
        <span class="status">
          {{ f.connected ? 'Connected' : `Disconnected at ${f.disconnectedAt}` }}
        </span>
      </div>
      <ae-button
        slot="right"
        type="dramatic"
        size="small"
        plain
        uppercase
        @click="removeFollower(f.id)"
      >revoke</ae-button>
    </item>

    <fixed-add-button
      :to="{ name: 'settings-remote-connection-new' }"
      quick-id />
  </mobile-page>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { AeButton } from '@aeternity/aepp-components';
import MobilePage from '../components/MobilePage.vue';
import SettingsHeading from '../components/SettingsHeading.vue';
import ListItem from '../components/ListItem.vue';
import FixedAddButton from '../components/FixedAddButton.vue';

export default {
  components: {
    AeButton,
    MobilePage,
    Heading: SettingsHeading,
    Item: ListItem,
    FixedAddButton,
  },
  computed: mapState({
    followers: ({ mobile: { followers } }) =>
      Object.values(followers)
        .map(f => ({
          ...f,
          disconnectedAt: new Date(f.disconnectedAt).toLocaleString(),
        })),
  }),
  methods: mapMutations(['removeFollower']),
};
</script>

<style src="./Settings.scss" lang="scss" scoped />

<style lang="scss" scoped>
@import '~@aeternity/aepp-components/dist/variables.scss';

.settings {
  .list-item {
    height: 84px;

    .follower {
      .name {
        line-height: 1.56;
      }

      .status {
        line-height: 1.44;
        color: $grey;
        font-size: 16px;
      }
    }
  }
}
</style>

<template>
  <mobile-page
    :redirect-to-on-close="{ name: 'settings' }"
    title="Remote Connection"
    back-button
    class="settings"
  >
    <ae-card fill="maximum">
      <list-item
        v-for="follower in followers"
        :key="follower.id"
        :title="follower.name"
        :subtitle="follower.connected ? 'Connected' : `Disconnected at ${follower.disconnectedAt}`"
        inactive
      >
        <ae-button
          slot="right"
          fill="primary"
          size="small"
          plain
          @click="removeFollower(follower.id)"
        >
          revoke
        </ae-button>
      </list-item>

      <list-item-button :to="{ name: 'settings-remote-connection-new' }">
        Connect device
      </list-item-button>
    </ae-card>
  </mobile-page>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import MobilePage from '../../components/MobilePage.vue';
import AeCard from '../../components/AeCard.vue';
import ListItem from '../../components/ListItem.vue';
import ListItemButton from '../../components/ListItemButton.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: {
    MobilePage,
    AeCard,
    ListItem,
    ListItemButton,
    AeButton,
  },
  computed: mapState({
    followers: ({ mobile: { followers } }) => Object.values(followers)
      .map(f => ({
        ...f,
        disconnectedAt: new Date(f.disconnectedAt).toLocaleString(),
      })),
  }),
  methods: mapMutations(['removeFollower']),
};
</script>

<style lang="scss" scoped>
@import './Settings.scss';
@import './SettingsHeader.scss';
</style>

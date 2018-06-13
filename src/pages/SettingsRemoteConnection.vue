<template>
  <modal-page
    title="Remote Connection"
    :redirectToOnClose="{ name: 'settings' }"
    class="settings"
  >
    <heading>Connected devices</heading>
    <item v-for="f in followers" :key="f.key" inactive>
      <div class="follower">
        <span class="name">{{f.name}}</span><br />
        <span class="status">
          {{f.connected ? 'Connected' : `Disconnected at ${f.disconnectedAt}`}}
        </span>
      </div>
      <ae-button
        slot="right"
        type="dramatic"
        size="small"
        plain
        uppercase
        @click="removeFollower(f.key)"
      >revoke</ae-button>
    </item>

    <fixed-add-button quick-id :to="{ name: 'settings-remote-connection-new' }" />
  </modal-page>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { AeButton } from '@aeternity/aepp-components'
import ModalPage from '@/components/ModalPage.vue'
import SettingsHeading from '@/components/SettingsHeading'
import SettingsItem from '@/components/SettingsItem'
import FixedAddButton from '@/components/FixedAddButton.vue'

export default {
  components: {
    AeButton,
    ModalPage,
    Heading: SettingsHeading,
    Item: SettingsItem,
    FixedAddButton
  },
  computed: mapState({
    followers: ({ mobile: { followers, isFollowerConnected } }) =>
      Object.values(followers)
        .map(f => ({
          ...f,
          disconnectedAt: new Date(f.disconnectedAt).toLocaleString(),
          connected: isFollowerConnected[f.key]
        }))
  }),
  methods: mapMutations(['removeFollower'])
}
</script>

<style src="./Settings.scss" lang="scss" scoped />

<style lang="scss" scoped>
@import '~@aeternity/aepp-components/dist/variables.scss';

.settings {
  .settings-item {
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

    .ae-button {
      &, /deep/ .label {
        padding-right: 0;
      }
    }
  }
}
</style>

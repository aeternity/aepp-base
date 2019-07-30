<template>
  <MobilePage
    :left-button-to="{ name: 'settings' }"
    left-button-icon-name="back"
    :title="$t('remote-connection.settings.title')"
    header-fill="light"
    fill="neutral"
  >
    <AeCard fill="maximum">
      <ListItem
        v-for="follower in followers"
        :key="follower.id"
        :title="follower.name"
        :subtitle="follower.connected
          ? $t('remote-connection.settings.list.connected')
          : $t('remote-connection.settings.list.disconnected', { date: follower.disconnectedAt })"
        inactive
      >
        <AeButton
          slot="right"
          fill="primary"
          size="small"
          plain
          @click="removeFollower(follower.id)"
        >
          {{ $t('remote-connection.settings.list.revoke') }}
        </AeButton>
      </ListItem>
    </AeCard>

    <ButtonAddFixed :to="{ name: 'settings-remote-connection-new' }" />
  </MobilePage>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import MobilePage from '../../components/mobile/Page.vue';
import AeCard from '../../components/AeCard.vue';
import ListItem from '../../components/ListItem.vue';
import ButtonAddFixed from '../../components/ButtonAddFixed.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: {
    MobilePage,
    AeCard,
    ListItem,
    ButtonAddFixed,
    AeButton,
  },
  computed: mapState({
    followers: ({ mobile: { followers } }) => Object.values(followers)
      .map(f => ({
        ...f,
        disconnectedAt: new Date(f.disconnectedAt).toLocaleString(),
      })),
  }),
  methods: mapActions(['removeFollower']),
};
</script>

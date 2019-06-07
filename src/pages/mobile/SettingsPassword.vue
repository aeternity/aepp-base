<template>
  <MobilePage
    :left-button-to="{ name: 'settings' }"
    left-button-icon-name="back"
    title="Wallet Authentication"
    header-fill="light"
    fill="neutral"
    class="settings-password"
  >
    <AeCard fill="maximum">
      <ListItem
        title="Change password"
        subtitle="Update your password"
      >
        <LeftMore slot="right" />
      </ListItem>
      <ListItemButton>
        Remove password
      </ListItemButton>
    </AeCard>
  </MobilePage>
</template>

<script>
import MobilePage from '../../components/mobile/Page.vue';
import AeCard from '../../components/AeCard.vue';
import ListItem from '../../components/ListItem.vue';
import { LeftMore } from '../../components/icons';
import ListItemButton from '../../components/ListItemButton.vue';

export default {
  components: {
    MobilePage,
    AeCard,
    ListItem,
    LeftMore,
    ListItemButton,
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables/colors.scss';

.settings-password.mobile-page .list-item-button {
  color: $color-primary;
}
</style>

<template>
  <Notification
    v-bind="$attrs"
    class="notification-mnemonic-backup"
  >
    <ListItem
      title="Please Backup your Recover Phrase!"
      subtitle="Secure your funds to prevent loss."
    >
      <ListItemCircle slot="icon">
        !
      </ListItemCircle>
    </ListItem>

    <template slot="footer">
      <AeButton
        :to="{ name: 'settings-security-course-intro' }"
        fill="dark"
        size="small"
        plain
      >
        Security course
      </AeButton>
      <AeButton
        :to="{ name: 'settings-mnemonic' }"
        fill="primary"
        size="small"
        plain
      >
        Backup now
      </AeButton>
    </template>
  </Notification>
</template>

<script>
import Notification from '../Notification.vue';
import ListItem from '../ListItem.vue';
import ListItemCircle from '../ListItemCircle.vue';
import AeButton from '../AeButton.vue';

export default {
  components: {
    Notification,
    ListItem,
    ListItemCircle,
    AeButton,
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/placeholders/typography.scss';
@import '../../styles/variables/colors.scss';

.notification-mnemonic-backup .list-item-circle {
  @extend %face-sans-l;
  line-height: rem(32px);
  background-color: $color-primary;
}
</style>

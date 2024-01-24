<template>
  <Notification
    v-bind="$attrs"
    class="notification-mnemonic-backup"
  >
    <ListItem
      :title="$t('settings.mnemonic.notification.title')"
      :subtitle="$t('settings.mnemonic.notification.subtitle')"
    >
      <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
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
        {{ $t('settings.mnemonic.notification.to-security-course') }}
      </AeButton>
      <AeButton
        :to="{ name: 'settings-mnemonic' }"
        fill="primary"
        size="small"
        plain
      >
        {{ $t('settings.mnemonic.notification.to-mnemonic') }}
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
@use '../../styles/variables';
@use '../../styles/functions';
@use '../../styles/typography';

.notification-mnemonic-backup .list-item-circle {
  @extend %face-sans-l;
  line-height: functions.rem(32px);
  background-color: variables.$color-primary;
}
</style>

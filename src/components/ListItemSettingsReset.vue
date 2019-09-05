<template>
  <ListItem
    :title="$globals.IS_MOBILE_DEVICE
      ? $t('settings.reset.title')
      : $t('settings.reset.title-desktop')"
    :subtitle="$globals.IS_MOBILE_DEVICE
      ? $t('settings.reset.subtitle')
      : $t('settings.reset.subtitle-desktop')"
    @click="reset"
  >
    <ListItemCircle slot="icon">
      <SignOut />
    </ListItemCircle>
  </ListItem>
</template>

<script>
import ListItem from './ListItem.vue';
import ListItemCircle from './ListItemCircle.vue';
import { SignOut } from './icons';

export default {
  components: { ListItem, ListItemCircle, SignOut },
  methods: {
    async reset() {
      await this.$store.dispatch('modals/open', {
        name: 'confirm',
        text: process.env.IS_MOBILE_DEVICE
          ? this.$t('settings.reset.confirm')
          : this.$t('settings.reset.confirm-desktop'),
        primaryButtonText: this.$t('settings.reset.button'),
      });
      this.$store.dispatch('reset');
    },
  },
};
</script>

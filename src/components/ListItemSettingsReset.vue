<template>
  <ListItem
    :title="$globals.IS_MOBILE_DEVICE ? 'Reset Key Storage' : 'Reset All Data'"
    :subtitle="$globals.IS_MOBILE_DEVICE ? 'After resetting, a recovery is required' : ''"
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
      const message = process.env.IS_MOBILE_DEVICE
        ? 'If you haven\'t backup your account, you won\'t be able to enter it again.'
        : 'You will revoke your connection with mobile Base æpp and clear saved state.';
      await this.$store.dispatch('modals/open', {
        name: 'confirm',
        text: `${message} Are you sure?`,
        primaryButtonText: 'Reset',
      });
      this.$store.dispatch('reset');
    },
  },
};
</script>

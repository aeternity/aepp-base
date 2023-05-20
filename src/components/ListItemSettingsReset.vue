<template>
  <ListItem
    :title="$globals.ENV_MOBILE_DEVICE
      ? $t('settings.reset.title')
      : $t('settings.reset.title-desktop')"
    :subtitle="$globals.ENV_MOBILE_DEVICE
      ? $t('settings.reset.subtitle')
      : $t('settings.reset.subtitle-desktop')"
    data-cy="reset"
    @click="resetConfirm"
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
import { resetConfirm } from '../lib/methods';

export default {
  components: { ListItem, ListItemCircle, SignOut },
  methods: { resetConfirm },
};
</script>

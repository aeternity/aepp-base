<template>
  <ListItem
    :subtitle="active.name"
    v-bind="$attrs"
    :title="$t('settings.language')"
  >
    <ListItemCircle slot="icon">
      <Globe />
    </ListItemCircle>
    <slot slot="right" />
  </ListItem>
</template>

<script>
import { mapGetters } from 'vuex';
import ListItem from './ListItem.vue';
import ListItemCircle from './ListItemCircle.vue';
import { Globe } from './icons';

export default {
  components: { ListItem, ListItemCircle, Globe },
  computed: mapGetters('languages', ['active']),
};
</script>

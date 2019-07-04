<template>
  <div>
    <ListItem
      v-for="language in list"
      :key="language.code"
      :title="language.name"
    >
      <AeRadio
        slot="right"
        :checked="language === active"
        @change="setLanguage(language)"
      />
    </ListItem>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ListItem from './ListItem.vue';
import AeRadio from './AeRadio.vue';

export default {
  components: { ListItem, AeRadio },
  computed: mapGetters('languages', ['list', 'active']),
  methods: {
    setLanguage(language) {
      this.$store.dispatch('languages/setActiveCode', language.code);
      this.$emit('switch');
    },
  },
};
</script>

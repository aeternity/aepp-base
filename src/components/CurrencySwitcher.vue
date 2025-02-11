<template>
  <div>
    <ListItem v-for="currency in list" :key="currency.code" :title="currency.name">
      <AeRadio slot="right" :checked="currency === active" @change="setCurrency(currency)" />
    </ListItem>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ListItem from './ListItem.vue';
import AeRadio from './AeRadio.vue';

export default {
  components: { ListItem, AeRadio },
  computed: mapGetters('currencies', ['list', 'active']),
  methods: {
    setCurrency(currency) {
      this.$store.commit('currencies/setActiveCode', currency.code);
      this.$emit('switch');
    },
  },
};
</script>

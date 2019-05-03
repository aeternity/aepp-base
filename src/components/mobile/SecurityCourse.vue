<template>
  <ListItemChoose
    v-bind="$attrs"
    :to="{ name }"
    :showmark="isCourseRead(name)"
    checked
    v-on="$listeners"
  >
    <img
      slot="icon"
      :src="lockEmoji"
    >
  </ListItemChoose>
</template>

<script>
import lockEmoji from 'emoji-datasource-apple/img/apple/64/1f513.png';
import ListItemChoose from '../ListItemChoose.vue';

export default {
  components: { ListItemChoose },
  props: {
    name: { type: String, required: true },
  },
  data: () => ({
    lockEmoji,
  }),
  methods: {
    isCourseRead(name) {
      return name in this.$store.state.mobile.securityCourses;
    },
  },
};
</script>

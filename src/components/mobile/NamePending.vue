<template>
  <ListItemCircle class="name-pending">
    <Reload />
  </ListItemCircle>
</template>

<script>
import ListItemCircle from '../ListItemCircle.vue';
import { Reload } from '../icons';

export default {
  components: { ListItemCircle, Reload },
};
</script>

<style lang="scss" scoped>
@import '../../styles/functions';

.name-pending {
  $size: rem(24px);
  width: $size;
  height: $size;
  line-height: $size;

  .icon {
    height: rem(14px);
  }
}
</style>

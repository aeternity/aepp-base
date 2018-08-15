<template>
  <div class="dialog-header">
    <ae-app-icon :src="iconSrc" />
    <p class="app-name">{{ appName }}</p>
    <span>{{ title }}</span>
  </div>
</template>

<script>
import { AeAppIcon } from '@aeternity/aepp-components';
import { DEFAULT_ICON } from '../lib/appsRegistry';

export default {
  components: {
    AeAppIcon,
  },
  props: {
    appName: {
      type: String,
      default: 'Base æpp',
    },
    iconSrc: {
      type: String,
      default: DEFAULT_ICON,
    },
    title: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-header {
  .ae-app-icon {
    margin:10px auto;
  }

  .app-name {
    font-weight: 500;
  }
}
</style>

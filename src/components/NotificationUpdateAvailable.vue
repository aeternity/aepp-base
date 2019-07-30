<template>
  <Notification
    v-bind="$attrs"
    :resolve="resolve"
    class="notification-update-available"
  >
    {{ $t('update-available.title') }}

    <template slot="footer">
      <AeButton
        plain
        @click="resolve(true)"
      >
        {{ $t('update-available.restart') }}
      </AeButton>
    </template>
  </Notification>
</template>

<script>
import Notification from './Notification.vue';
import AeButton from './AeButton.vue';

export default {
  components: {
    Notification,
    AeButton,
  },
  props: {
    resolve: { type: Function, required: true },
  },
};
</script>

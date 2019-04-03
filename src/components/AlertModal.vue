<template>
  <AeModalLight
    v-if="alert"
    :title="alert.title"
    class="alert-modal"
  >
    {{ alert.text }}

    <AeButton
      slot="buttons"
      size="small"
      plain
      @click="alert.resolve"
    >
      {{ alert.buttonText || 'Ok' }}
    </AeButton>
  </AeModalLight>
</template>

<script>
import { mapState } from 'vuex';
import { AeModalLight } from '@aeternity/aepp-components-3';
import AeButton from './AeButton.vue';

export default {
  components: { AeModalLight, AeButton },
  computed: mapState(['alert']),
};
</script>

<style lang="scss" scoped>
.alert-modal.ae-overlay /deep/ .ae-modal-light {
  padding-left: 0;
  padding-right: 0;

  main, .buttons {
    padding-left: 20px;
    padding-right: 20px;
  }

  main {
    margin-bottom: 20px;
  }

  .buttons {
    padding-top: 20px;
    margin-top: 0;
    border-top: 2px solid #f0f0f0;
  }
}
</style>

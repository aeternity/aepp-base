<template>
  <ae-modal-light
    v-if="alert"
    :title="alert.title"
    class="alert-modal"
  >
    {{ alert.text }}

    <ae-button
      slot="buttons"
      size="small"
      plain
      uppercase
      @click="alert.resolve"
    >
      {{ alert.buttonText || 'Ok' }}
    </ae-button>
  </ae-modal-light>
</template>

<script>
import { mapState } from 'vuex';
import { AeButton, AeModalLight } from '@aeternity/aepp-components';

export default {
  components: { AeModalLight, AeButton },
  computed: mapState(['alert']),
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components/dist/variables.scss';

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

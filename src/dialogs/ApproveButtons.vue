<template>
  <div class="approve-buttons">
    <ae-button
      size="smaller"
      type="normal"
      @click="reject">
      <ae-icon
        slot="icon"
        name="error"/>
      {{ rejectLabel }}
    </ae-button>
    <ae-button
      size="smaller"
      type="dramatic"
      @click="approve">
      <ae-icon
        slot="icon"
        name="check"/>
      {{ approveLabel }}
    </ae-button>
  </div>
</template>

<script>
import { AeButton, AeIcon } from '@aeternity/aepp-components'

export default {
  components: {
    AeButton,
    AeIcon
  },
  props: {
    rejectLabel: {
      type: String,
      default: 'Cancel'
    },
    approveLabel: {
      type: String,
      default: 'Approve'
    }
  },
  methods: {
    approve () {
      this.$emit('approve')
    },
    reject () {
      this.$emit('reject')
    }
  }
}
</script>

<style lang="scss" scoped>
.approve-buttons {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  margin-top: 40px;
}
</style>

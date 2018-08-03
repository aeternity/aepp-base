<template>
  <div
    class="address-book-item"
    @click="$emit('click')">
    <ae-identity-avatar :address="address" />
    <div class="details">
      <div class="name">{{ name }}</div>
      <div class="address">{{ formattedAddress }}</div>
    </div>
    <slot name="icon" />
  </div>
</template>

<script>
import { AeIdentityAvatar } from '@aeternity/aepp-components'
import { times } from 'lodash-es'

export default {
  components: { AeIdentityAvatar },
  props: {
    address: { type: String, required: true },
    name: { type: String, required: true }
  },
  computed: {
    formattedAddress () {
      return times(6, i => this.address.slice(7 * i, 7 * (i + 1))).join(' ')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components/dist/variables.scss';

.address-book-item {
  display: flex;
  align-items: center;

  .ae-identity-avatar {
    border: none;
  }

  .details {
    margin-left: 12px;
    flex-grow: 1;
    line-height: 18px;
    font-weight: 500;

    .name {
      font-size: 12px;
      color: $black;
    }

    .address {
      font-family: 'Roboto Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.5px;
      color: $grey;
      white-space: pre-line;
      max-width: 200px;
    }
  }
}
</style>

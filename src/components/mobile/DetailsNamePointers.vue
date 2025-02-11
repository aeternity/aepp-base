<template>
  <div v-if="value" class="details-name-pointers">
    <template v-for="(pointer, idx) in value">
      <DetailsAddress
        v-if="pointer.key === 'account_pubkey'"
        :key="idx"
        :name="$tc('modal.confirm-transaction-sign.pointer', idx + 1)"
        :address="pointer.id"
      />
      <template v-else>
        <DetailsField
          :key="`${idx}-key`"
          :name="$tc('modal.confirm-transaction-sign.pointer-key', idx + 1)"
          :value="pointer.key"
        />
        <DetailsRawData
          :key="`${idx}-id`"
          :name="$tc('modal.confirm-transaction-sign.pointer-id', idx + 1)"
          :data="pointer.id"
        />
      </template>
    </template>
  </div>
</template>

<script>
import DetailsField from './DetailsField.vue';
import DetailsAddress from './DetailsAddress.vue';
import DetailsRawData from './DetailsRawData.vue';

export default {
  components: { DetailsField, DetailsAddress, DetailsRawData },
  props: { value: { type: Array, default: null } },
};
</script>

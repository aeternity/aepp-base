<template>
  <MobilePage
    class="name-details"
    :title="$t('name.details.title')"
    left-button-icon-name="back"
    :left-button-to="{ name: 'name-list-personal' }"
  >
    <DetailsField
      :name="$t('name.details.name')"
      :value="details.name"
    />
    <DetailsRawData
      :name="$t('name.details.name-hash')"
      :data="details.nameHash"
    />
    <DetailsAddress
      :name="$t('name.details.owner')"
      :address="details.owner"
    />
    <DetailsField
      :name="$t('name.details.created-at-height')"
      :value="details.createdAtHeight"
    />
    <DetailsField
      :name="$t('name.details.expires-at-height')"
      :value="details.expiresAt"
    />
    <DetailsNamePointers :value="details.pointers" />

    <AeButton :to="{ name: 'name-transfer', params: { name } }">
      {{ $t('name.details.to-transfer') }}
    </AeButton>

    <AeButton :to="{ name: 'transaction-details', params: { hash: details.txHash } }">
      {{ $t('name.details.to-transactions') }}
    </AeButton>
  </MobilePage>
</template>

<script>
import { mapState } from 'vuex';
import prefixedAmount from '../../filters/prefixedAmount';
import MobilePage from '../../components/mobile/Page.vue';
import DetailsField from '../../components/mobile/DetailsField.vue';
import DetailsAddress from '../../components/mobile/DetailsAddress.vue';
import DetailsRawData from '../../components/mobile/DetailsRawData.vue';
import DetailsNamePointers from '../../components/mobile/DetailsNamePointers.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: {
    MobilePage,
    DetailsField,
    DetailsAddress,
    DetailsRawData,
    DetailsNamePointers,
    AeButton,
  },
  filters: { prefixedAmount },
  props: {
    name: { type: String, required: true },
  },
  computed: mapState('names', {
    details({ owned }) {
      return owned.find(({ name }) => name === this.name);
    },
  }),
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.name-details {
  .details-item, .details-name-pointers {
    &:first-child {
      border-top: none;
    }

    --color-primary: #{$color-neutral-negative-3};
    --color-secondary: #{$color-neutral-negative-1};
  }
}
</style>

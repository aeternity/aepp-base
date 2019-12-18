<template>
  <MobilePage
    class="name-details"
    :title="$t('name.details.title')"
    left-button-icon-name="back"
    :left-button-to="{ name: 'name-list' }"
  >
    <DetailsList
      :object="details"
      :field-renderers="fieldRenderers"
    />

    <AeButton
      :disabled="isDefaultName || !address"
      @click="setAsDefaultName"
    >
      {{ $t('name.details.set-default') }}
    </AeButton>

    <AeButton :to="{ name: 'name-point', params: { name } }">
      {{ $t('name.details.to-point') }}
    </AeButton>

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
import DetailsList from '../../components/mobile/DetailsList.vue';
import {
  Name, NameId, OwnerId, CreatedAtHeight, ExpiresAtHeight,
} from '../../components/mobile/details-fields';
import { getAddressByNameEntry } from '../../lib/utils';
import DetailsNamePointers from '../../components/mobile/DetailsNamePointers.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: {
    MobilePage,
    DetailsList,
    AeButton,
  },
  filters: { prefixedAmount },
  props: {
    name: { type: String, required: true },
  },
  data: () => ({
    fieldRenderers: {
      name: Name,
      nameHash: NameId,
      owner: OwnerId,
      createdAtHeight: CreatedAtHeight,
      expiresAt: ExpiresAtHeight,
      pointers: DetailsNamePointers,
    },
  }),
  computed: {
    address() {
      return getAddressByNameEntry(this.details);
    },
    ...mapState('names', {
      details({ owned }) {
        return owned && owned.names.find(({ name }) => name === this.name);
      },
      isDefaultName(state, { getDefault }) {
        return this.address && this.name === getDefault(this.address);
      },
    }),
  },
  async mounted() {
    const id = setInterval(() => this.$store.dispatch('names/fetchOwned'), 3000);
    this.$once('hook:destroyed', () => clearInterval(id));
  },
  methods: {
    setAsDefaultName() {
      this.$store.dispatch('names/setDefault', {
        name: this.name,
        address: this.address,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.name-details {
  .details-list {
    --color-primary: #{$color-neutral-negative-3};
    --color-secondary: #{$color-neutral-negative-1};

    ::v-deep .details-item:first-child {
      border-top: none;
    }
  }
}
</style>

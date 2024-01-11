<template>
  <Page
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

    <AeButton
      :disabled="!address"
      @click="extendName"
    >
      {{ $t('name.details.to-extend') }}
    </AeButton>

    <AeButton :to="{ name: 'name-point', params: { name } }">
      {{ $t('name.details.to-point') }}
    </AeButton>

    <AeButton :to="{ name: 'name-transfer', params: { name } }">
      {{ $t('name.details.to-transfer') }}
    </AeButton>

    <AeButton @click="goToTransactionDetails">
      {{ $t('name.details.to-transactions') }}
    </AeButton>
  </Page>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import prefixedAmount from '../../filters/prefixedAmount';
import Page from '../../components/Page.vue';
import DetailsList from '../../components/mobile/DetailsList.vue';
import {
  Name, NameId, OwnerId, CreatedAtHeight, ExpiresAtHeight,
} from '../../components/mobile/details-fields';
import { getAddressByNameEntry } from '../../lib/utils';
import DetailsNamePointers from '../../components/mobile/DetailsNamePointers.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: {
    Page,
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
    ...mapGetters(['currentNetwork']),
    ...mapState('names', {
      details({ owned }) {
        const entry = owned && owned.names.find(({ name }) => name === this.name);
        return {
          ...entry,
          owner: entry.accountId ?? entry.info.ownership.current,
        };
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
    async extendName() {
      const initialAccountIdx = this.$store.state.accounts.activeIdx;
      const requiredAccountIdx = this.$store.state.accounts.list
        .findIndex(({ address }) => address === this.details.info.ownership.current);
      if (initialAccountIdx !== requiredAccountIdx) {
        this.$store.commit('accounts/setActiveIdx', requiredAccountIdx);
      }
      await this.$store.dispatch('names/updatePointer', { name: this.name, address: this.address });
      if (initialAccountIdx !== requiredAccountIdx) {
        this.$store.commit('accounts/setActiveIdx', initialAccountIdx);
      }
    },
    async goToTransactionDetails() {
      const { hash } = await this.$store.state.sdk.middleware.api
        .getTxByIndex(this.details.info.claims[0]);
      await this.$router.push(ENV_MOBILE_DEVICE
        ? { name: 'transaction-details', params: { hash } }
        : `${this.currentNetwork.explorerUrl}/transactions/${hash}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@use '../../styles/variables';

.name-details {
  .details-list {
    --color-primary: #{variables.$color-neutral-negative-3};
    --color-secondary: #{variables.$color-neutral-negative-1};

    ::v-deep .details-item:first-child {
      border-top: none;
    }
  }
}
</style>

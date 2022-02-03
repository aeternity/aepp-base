<template>
  <Page
    fill="neutral"
    class="auction-list"
  >
    <NameListHeader />

    <h2>
      {{ view === VIEW_ENDING_SOONEST ? $t('name.list.ending-soonest-note') : '' }}
      {{ view === VIEW_CHARACTER_LENGTH ? $t('name.list.character-length-note') : '' }}
      {{ view === VIEW_MAX_BID ? $t('name.list.max-bid-note') : '' }}
    </h2>

    <template v-if="view === VIEW_CHARACTER_LENGTH">
      <ButtonGroup
        v-for="lineStartsWith in [1, 7]"
        :key="lineStartsWith"
      >
        <ButtonFlat
          v-for="l in times(6, idx => idx + lineStartsWith)"
          :key="l"
          :to="{ name: 'auction-list-character-length', params: { length: l } }"
        >
          {{ l }}
        </ButtonFlat>
      </ButtonGroup>
    </template>

    <AeSpinner v-if="auctions === null" />
    <h2 v-else-if="auctions.length === 0">
      {{ $t('name.list.no-auctions') }}
    </h2>
    <template v-else>
      <AeCard fill="maximum">
        <ListItemAuction
          v-for="auction in auctions"
          :key="auction.name"
          v-bind="auction"
          :subtitle-last-bid="view === VIEW_MAX_BID"
          :to="{ name: 'auction-details', params: { name: auction.name } }"
        />
      </AeCard>

      <div
        v-if="pagination.length > 1"
        class="pagination"
      >
        <Component
          :is="p.to ? 'RouterLink' : 'span'"
          v-for="p in pagination"
          :key="p.text"
          :to="p.to"
        >
          <ArrowDouble
            v-if="['first', 'last'].includes(p.text)"
            :class="p.text"
          />
          <template v-else>
            {{ p.text }}
          </template>
        </Component>
      </div>
    </template>

    <ButtonAddFixed :to="{ name: 'name-new' }" />
  </Page>
</template>

<script>
import Swagger from 'swagger-client';
import { times } from 'lodash-es';
import { AENS_DOMAIN } from '../../lib/constants';
import Page from '../../components/Page.vue';
import NameListHeader from '../../components/mobile/NameListHeader.vue';
import ButtonGroup from '../../components/mobile/ButtonGroup.vue';
import ButtonFlat from '../../components/mobile/ButtonFlat.vue';
import AeSpinner from '../../components/AeSpinner.vue';
import AeCard from '../../components/AeCard.vue';
import ListItemAuction from '../../components/mobile/ListItemAuction.vue';
import { ArrowDouble } from '../../components/icons';
import ButtonAddFixed from '../../components/ButtonAddFixed.vue';

const ITEMS_PER_PAGE = 5;
const VIEW_ENDING_SOONEST = 'ending-soonest';
const VIEW_CHARACTER_LENGTH = 'character-length';
const VIEW_MAX_BID = 'max-bid';

export default {
  components: {
    Page,
    NameListHeader,
    ButtonGroup,
    ButtonFlat,
    AeSpinner,
    AeCard,
    ListItemAuction,
    ArrowDouble,
    ButtonAddFixed,
  },
  props: {
    view: { type: String, required: true },
    page: { type: Number, default: 1 },
    length: { type: Number, default: 6 },
  },
  data: () => ({
    VIEW_ENDING_SOONEST,
    VIEW_CHARACTER_LENGTH,
    VIEW_MAX_BID,
    allAuctions: null,
  }),
  computed: {
    pagination() {
      const res = [];
      const { page: p, pageCount: pc } = this;
      if (p > 3) res.push({ text: 'first', to: 1 });
      if (p > 2) res.push({ text: p - 2, to: p - 2 });
      if (p > 1) res.push({ text: p - 1, to: p - 1 });
      res.push({ text: this.page });
      if (p < pc) res.push({ text: p + 1, to: p + 1 });
      if (p < pc - 1) res.push({ text: p + 2, to: p + 2 });
      if (p < pc - 2) res.push({ text: 'last', to: pc });
      return res.map((i) => ({
        ...i,
        to: i.to && ({
          name: this.$route.name,
          params: { ...this.$route.params, page: i.to },
        }),
      }));
    },
    auctionsFiltered() {
      if (!this.allAuctions) return null;
      const all = [...this.allAuctions];
      switch (this.view) {
        case VIEW_ENDING_SOONEST:
          return all.sort((a1, a2) => a1.info.auctionEnd - a2.info.auctionEnd);
        case VIEW_CHARACTER_LENGTH:
          return all.filter(({ name }) => name.length === this.length + AENS_DOMAIN.length);
        case VIEW_MAX_BID:
          return all.sort((a1, a2) => a2.info.lastBid.tx.nameFee - a1.info.lastBid.tx.nameFee);
        default:
          throw new Error(`Invalid view: ${this.view}`);
      }
    },
    auctions() {
      if (!this.auctionsFiltered) return null;
      return this.auctionsFiltered
        .slice((this.page - 1) * ITEMS_PER_PAGE, this.page * ITEMS_PER_PAGE);
    },
    pageCount() {
      if (!this.auctionsFiltered) return 0;
      return Math.ceil(this.auctionsFiltered.length / ITEMS_PER_PAGE);
    },
  },
  async mounted() {
    const { state: { sdk: sdkPromise }, getters: { currentNetwork } } = this.$store;
    const sdk = sdkPromise.then ? await sdkPromise : sdkPromise;
    const res = await sdk.middleware.api.getAllAuctions({ limit: 100 });
    let { next } = res;
    this.allAuctions = res.data;
    // TODO: simplify UI or add additional options in getAllAuctions to query only necessary info
    while (next) {
      const url = currentNetwork.middlewareUrl + next;
      const r = sdk.middleware.responseInterceptor(
        // eslint-disable-next-line no-await-in-loop
        await Swagger.serializeRes(await fetch(url), url),
      ).body;
      this.allAuctions.push(...r.data);
      next = r.next;
    }
  },
  methods: {
    times,
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/typography';

.auction-list {
  .button-group {
    overflow-x: auto;
    margin-bottom: rem(30px);
    white-space: nowrap;

    + .length-selector {
      margin-top: rem(-15px);
    }

    .button-flat {
      width: rem(35px);
    }
  }

  .pagination {
    margin-top: rem(16px);
    @extend %face-sans-base;
    text-align: center;

    span, a {
      padding: 0 rem(5px);
    }

    a {
      text-decoration: none;
      color: $color-neutral;

      .icon {
        height: rem(7px);

        &.first {
          transform: rotate(180deg);
        }
      }
    }
  }
}
</style>

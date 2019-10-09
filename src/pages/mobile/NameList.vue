<template>
  <MobilePage
    fill="neutral"
    class="name-list"
  >
    <NameListHeader />

    <h2>
      {{ view === VIEW_ENDING_SOONEST ? $t('name.list.ending-soonest-note') : '' }}
      {{ view === VIEW_CHARACTER_LENGTH ? $t('name.list.character-length-note') : '' }}
      {{ view === VIEW_MAX_BID ? $t('name.list.max-bid-note') : '' }}
    </h2>

    <template v-if="view === VIEW_CHARACTER_LENGTH">
      <div
        v-for="lineStartsWith in [1, 7]"
        :key="lineStartsWith"
        class="length-selector"
      >
        <ButtonFlat
          v-for="l in times(6, idx => idx + lineStartsWith)"
          :key="l"
          :to="{ name: 'name-list-character-length', params: { length: l } }"
        >
          {{ l }}
        </ButtonFlat>
      </div>
    </template>

    <h2 v-if="!isAuctionsSupported">
      {{ $t('name.list.auctions-not-supported') }}
    </h2>
    <AeLoader v-else-if="auctions === null" />
    <h2 v-else-if="auctions.length === 0">
      {{ $t('name.list.no-auctions') }}
    </h2>
    <template v-else>
      <AeCard fill="maximum">
        <ListItemAuction
          v-for="auction in auctions"
          :key="auction.name"
          v-bind="auction"
          :subtitle-winning-bid="view === VIEW_MAX_BID"
          inactive
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
  </MobilePage>
</template>

<script>
import { pick, times } from 'lodash-es';
import { mapState } from 'vuex';
import { isAensAuctionsSupported, getAensDomain } from '../../lib/utils';
import MobilePage from '../../components/mobile/Page.vue';
import NameListHeader from '../../components/mobile/NameListHeader.vue';
import ButtonFlat from '../../components/mobile/ButtonFlat.vue';
import AeLoader from '../../components/AeLoader.vue';
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
    MobilePage,
    NameListHeader,
    ButtonFlat,
    AeLoader,
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
    auctions: null,
    pageCount: 0,
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
      return res.map(i => ({
        ...i,
        to: i.to && ({
          name: this.$route.name,
          params: { ...this.$route.params, page: i.to },
        }),
      }));
    },
    ...mapState({
      isAuctionsSupported: ({ sdk }) => sdk && !sdk.then
        && isAensAuctionsSupported(sdk.getNodeInfo()),
    }),
  },
  subscriptions() {
    return pick(this.$store.state.observables, ['topBlockHeight']);
  },
  async mounted() {
    this.$watch(
      state => pick(state, ['view', 'page', 'length', 'isAuctionsSupported']),
      ({ view, page, length }) => {
        if (!this.isAuctionsSupported) return;
        this.fetchAuctions({
          page,
          ...{
            [VIEW_ENDING_SOONEST]: { sort: 'expiration' },
            [VIEW_CHARACTER_LENGTH]: { length },
            [VIEW_MAX_BID]: { sort: 'max_bid' },
          }[view] || (() => { throw new Error(`Invalid view: ${view}`); })(),
        });
      },
      { immediate: true },
    );
  },
  methods: {
    times,
    async fetchAuctions({ page, sort, length: lengthWithoutDomain }) {
      const length = lengthWithoutDomain
        + getAensDomain(this.$store.state.sdk.getNodeInfo()).length;
      this.auctions = null;
      const [auctions, { count }] = await Promise.all([
        this.$store.state.sdk.middleware.getActiveNameAuctions({
          page, limit: ITEMS_PER_PAGE, sort, length,
        }),
        this.$store.state.sdk.middleware.getActiveNameAuctionsCount({ length }),
      ]);
      this.auctions = auctions;
      this.pageCount = Math.ceil(count / ITEMS_PER_PAGE);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/typography';

.name-list {
  .length-selector {
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
    @extend %face-sans-s;
    text-align: center;

    span, a {
      padding: 0 rem(2px);
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

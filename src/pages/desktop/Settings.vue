<template>
  <div class="settings">
    <guide size="big">
      <em>Settings</em>
    </guide>

    <ae-card fill="maximum">
      <list-item
        title="Network"
        :subtitle="networkId ? `Network ID ${networkId}` : ''"
      >
        <ae-icon
          slot="icon"
          fill="secondary"
          face="round"
          name="globe"
        />
        <div
          slot="right"
          class="value"
        >
          {{ currentNetwork.name }}
          <button-plain @click="networkMode = 'switch'">
            <ae-icon
              ref="icon"
              name="left-more"
            />
          </button-plain>
        </div>
      </list-item>
    </ae-card>

    <ae-popover
      :anchor="networkMode ? $refs.icon : null"
      @close="closePopover"
    >
      <network-switcher
        v-if="networkMode === 'switch'"
        @network-add-button-click="networkMode = 'add'"
        @switch="networkMode = false"
      />
      <network-add
        v-else-if="networkMode === 'add'"
        @finally="networkMode = 'switch'"
      />
    </ae-popover>
  </div>
</template>

<script>
import { defer } from 'lodash-es';
import { mapState, mapGetters } from 'vuex';
import { AeIcon } from '@aeternity/aepp-components-3';
import Guide from '../../components/Guide.vue';
import AeCard from '../../components/AeCard.vue';
import AePopover from '../../components/AePopover.vue';
import ListItem from '../../components/ListItem.vue';
import ButtonPlain from '../../components/ButtonPlain.vue';
import NetworkSwitcher from '../../components/NetworkSwitcher.vue';
import NetworkAdd from '../../components/NetworkAdd.vue';

export default {
  components: {
    AeIcon,
    AePopover,
    AeCard,
    Guide,
    ListItem,
    ButtonPlain,
    NetworkSwitcher,
    NetworkAdd,
  },
  data: () => ({
    networkMode: false,
  }),
  computed: {
    ...mapGetters(['currentNetwork']),
    ...mapState({
      networkId: state => state.sdk && state.sdk.nodeNetworkId,
    }),
  },
  methods: {
    closePopover() {
      defer(() => { this.networkMode = false; });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.settings {
  .ae-card {
    margin: 0 rem(-15px);

    .list-item {
      .value {
        @extend %face-sans-xs;
        color: $color-neutral-negative-1;

        .button-plain {
          margin-left: rem(10px);

          .ae-icon {
            vertical-align: middle;
            transform: rotate(90deg);
            font-size: rem(20px);
            color: #000;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="settings">
    <Guide size="big">
      <em>Settings</em>
    </Guide>

    <AeCard fill="maximum">
      <ListItem
        title="Reset All Data"
        @click="reset"
      >
        <ListItemCircle slot="icon">
          <SignOut />
        </ListItemCircle>
      </ListItem>

      <ListItem
        title="Network"
        class="network"
        :subtitle="networkId ? `Network ID ${networkId}` : ''"
      >
        <ListItemCircle slot="icon">
          <Globe />
        </ListItemCircle>
        <div
          slot="right"
          class="value"
        >
          {{ currentNetwork.name }}
          <ButtonPlain @click="networkMode = 'switch'">
            <LeftMore ref="icon" />
          </ButtonPlain>
        </div>
      </ListItem>
    </AeCard>

    <AePopover
      :anchor="networkMode ? $refs.icon : null"
      :anchor-origin="{ vertical: 'bottom', horizontal: 'right' }"
      :transform-origin="{ vertical: 'top', horizontal: 'right' }"
      @close="closePopover"
    >
      <NetworkSwitcher
        v-if="networkMode === 'switch'"
        @network-add-button-click="networkMode = 'add'"
        @switch="networkMode = false"
      />
      <NetworkAdd
        v-else-if="networkMode === 'add'"
        @finally="networkMode = 'switch'"
      />
    </AePopover>
  </div>
</template>

<script>
import { defer } from 'lodash-es';
import { mapState, mapGetters, mapActions } from 'vuex';
import Guide from '../../components/Guide.vue';
import AeCard from '../../components/AeCard.vue';
import AePopover from '../../components/AePopover.vue';
import ListItem from '../../components/ListItem.vue';
import ListItemCircle from '../../components/ListItemCircle.vue';
import { SignOut, Globe, LeftMore } from '../../components/icons';
import ButtonPlain from '../../components/ButtonPlain.vue';
import NetworkSwitcher from '../../components/NetworkSwitcher.vue';
import NetworkAdd from '../../components/NetworkAdd.vue';

export default {
  components: {
    AePopover,
    AeCard,
    Guide,
    ListItem,
    ListItemCircle,
    SignOut,
    Globe,
    ButtonPlain,
    LeftMore,
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
    ...mapActions(['reset']),
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/placeholders/typography.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.settings {
  .ae-card {
    margin: 0 rem(-15px);

    .list-item {
      &.network .list-item-circle {
        background-color: $color-secondary;
      }

      .value {
        @extend %face-sans-xs;
        color: $color-neutral-negative-1;

        .button-plain {
          margin-left: rem(10px);

          .icon {
            transform: rotate(90deg);
            color: #000;
          }
        }
      }
    }
  }
}
</style>

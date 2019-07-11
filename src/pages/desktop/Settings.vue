<template>
  <div class="settings">
    <Guide size="big">
      <em>{{ $t('settings.label') }}</em>
    </Guide>

    <AeCard fill="maximum">
      <ListItemSettingsReset />

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
            <LeftMore ref="networkIcon" />
          </ButtonPlain>
        </div>
      </ListItem>

      <ListItemSettingsLanguage>
        <ButtonPlain @click="showLanguageSwitcher = true">
          <LeftMore ref="languageIcon" />
        </ButtonPlain>
      </ListItemSettingsLanguage>
    </AeCard>

    <AePopover
      :anchor="networkMode ? $refs.networkIcon : null"
      v-bind="popoverOrigin"
      @close="closeNetworkPopover"
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

    <AePopover
      :anchor="showLanguageSwitcher ? $refs.languageIcon : null"
      v-bind="popoverOrigin"
      @close="showLanguageSwitcher = false"
    >
      <LanguageSwitcher @switch="showLanguageSwitcher = false" />
    </AePopover>
  </div>
</template>

<script>
import { defer } from 'lodash-es';
import { mapState, mapGetters } from 'vuex';
import Guide from '../../components/Guide.vue';
import AeCard from '../../components/AeCard.vue';
import AePopover from '../../components/AePopover.vue';
import ListItem from '../../components/ListItem.vue';
import ListItemCircle from '../../components/ListItemCircle.vue';
import ListItemSettingsReset from '../../components/ListItemSettingsReset.vue';
import ListItemSettingsLanguage from '../../components/ListItemSettingsLanguage.vue';
import { Globe, LeftMore } from '../../components/icons';
import ButtonPlain from '../../components/ButtonPlain.vue';
import NetworkSwitcher from '../../components/NetworkSwitcher.vue';
import NetworkAdd from '../../components/NetworkAdd.vue';
import LanguageSwitcher from '../../components/LanguageSwitcher.vue';

export default {
  components: {
    AePopover,
    AeCard,
    Guide,
    ListItem,
    ListItemCircle,
    ListItemSettingsReset,
    ListItemSettingsLanguage,
    Globe,
    ButtonPlain,
    LeftMore,
    NetworkSwitcher,
    NetworkAdd,
    LanguageSwitcher,
  },
  data: () => ({
    popoverOrigin: {
      anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
      transformOrigin: { vertical: 'top', horizontal: 'right' },
    },
    networkMode: false,
    showLanguageSwitcher: false,
  }),
  computed: {
    ...mapGetters(['currentNetwork']),
    ...mapState({
      networkId: state => state.sdk && state.sdk.nodeNetworkId,
    }),
  },
  methods: {
    closeNetworkPopover() {
      defer(() => { this.networkMode = false; });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/placeholders/typography.scss';
@import '../../styles/variables/colors.scss';

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
      }

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
</style>

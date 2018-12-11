<template>
  <div class="settings">
    <guide><em>Settings</em></guide>

    <div class="note">
      Now you can only switch between networks,
      other settings will be added as soon as we add features.
    </div>

    <ae-card fill="maximum">
      <list-item>
        <ae-icon
          fill="secondary"
          face="round"
          name="globe"
        />
        <div class="content">
          <div class="title">Network</div>
        </div>
        <div
          slot="right"
          class="value"
        >
          {{ networkName }}
          <button-plain @click="showNetworkDropdown = true">
            <ae-icon
              ref="icon"
              name="left-more"
            />
          </button-plain>
        </div>
      </list-item>
    </ae-card>

    <ae-popover
      :anchor="showNetworkDropdown ? $refs.icon : null"
      @close="showNetworkDropdown = false"
    >
      <settings-list-item
        v-for="network in networks"
        :key="network.url"
        @click="setRPCUrl(network.url)"
      >{{ network.name }}</settings-list-item>
    </ae-popover>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { AeIcon } from '@aeternity/aepp-components-3';
import Guide from '../../components/Guide.vue';
import ListItem from '../../components/ListItem.vue';
import AeCard from '../../components/AeCard.vue';
import AePopover from '../../components/AePopover.vue';
import SettingsListItem from '../../components/SettingsListItem.vue';
import ButtonPlain from '../../components/ButtonPlain.vue';
import networks from '../../lib/networksRegistry';

export default {
  components: {
    AeIcon,
    AePopover,
    AeCard,
    Guide,
    ListItem,
    SettingsListItem,
    ButtonPlain,
  },
  data: () => ({
    showNetworkDropdown: false,
    networks,
  }),
  computed: mapState({
    networkName: ({ rpcUrl }) => networks.find(n => n.url === rpcUrl).name,
  }),
  methods: mapMutations(['setRPCUrl']),
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
      margin: 0 rem(15px);
      padding: rem(8px) 0;
      width: auto;
      border: none;

      .content {
        margin-left: rem(13px);

        .title {
          @extend %face-sans-s;
          font-weight: 500;
          color: $color-neutral-negative-3;
        }

        .subtitle {
          @extend %face-sans-xs;
          color: $color-neutral-negative-1;
          letter-spacing: normal;
        }
      }

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

      &:not(:last-child) {
        border-bottom: 2px solid $color-neutral-positive-2;
      }
    }
  }
}
</style>

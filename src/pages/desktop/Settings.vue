<template>
  <div class="settings">
    <guide><em>Settings</em></guide>

    <note>
      Now you can only switch between networks,
      other settings will be added as soon as we add features.
    </note>

    <ae-card fill="maximum">
      <list-item title="Network">
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
      <list-item
        v-for="network in networks"
        :key="network.url"
        :title="network.name"
      >
        <ae-radio
          slot="right"
          :checked="network === currentNetwork"
          @change="setRPCUrl(network.url)"
        />
      </list-item>
    </ae-popover>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { AeIcon } from '@aeternity/aepp-components-3';
import Guide from '../../components/Guide.vue';
import Note from '../../components/Note.vue';
import AeCard from '../../components/AeCard.vue';
import AePopover from '../../components/AePopover.vue';
import ListItem from '../../components/ListItem.vue';
import AeRadio from '../../components/AeRadio.vue';
import ButtonPlain from '../../components/ButtonPlain.vue';

export default {
  components: {
    AeIcon,
    AePopover,
    AeCard,
    Guide,
    Note,
    ListItem,
    AeRadio,
    ButtonPlain,
  },
  data: () => ({
    showNetworkDropdown: false,
  }),
  computed: mapGetters(['networks', 'currentNetwork']),
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

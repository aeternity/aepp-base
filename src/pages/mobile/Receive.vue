<template>
  <MobilePage
    class="receive"
    :left-button-to="{ name: 'transfer' }"
    left-button-icon-name="back"
    header-fill="neutral"
  >
    <template slot="header">
      <Guide>
        <em>Share your address</em>
        with sender
      </Guide>

      <AeAccountReverse
        v-bind="activeAccount"
        fill="neutral"
      />
    </template>

    <ListItem
      v-copy-on-click="activeAccount.address"
      class="copy"
      title="Copy address"
      subtitle="Save to clipboard"
      border-dark
    >
      <img
        slot="icon"
        :src="writingHandEmoji"
      >
      <AeIcon
        slot="right"
        fill="alternative"
        face="round"
        name="check"
      />
    </ListItem>
  </MobilePage>
</template>

<script>
import { mapGetters } from 'vuex';
import { AeIcon } from '@aeternity/aepp-components-3';
import writingHandEmoji from 'emoji-datasource-apple/img/apple/64/270d-fe0f.png';
import copyOnClick from '../../directives/copyOnClick';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeAccountReverse from '../../components/mobile/AeAccountReverse.vue';
import ListItem from '../../components/ListItem.vue';

export default {
  components: {
    MobilePage,
    Guide,
    AeAccountReverse,
    ListItem,
    AeIcon,
  },
  directives: { copyOnClick },
  data() {
    return {
      writingHandEmoji,
    };
  },
  computed: mapGetters(['activeAccount']),
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';

.receive {
  .ae-account-reverse.ae-card {
    margin-left: rem(-36px);
    margin-right: rem(-36px);
  }

  .list-item.copy:not(.v-copied) .ae-icon {
    display: none;
  }
}
</style>

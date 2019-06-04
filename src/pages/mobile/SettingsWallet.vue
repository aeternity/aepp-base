<template>
  <MobilePage
    :left-button-to="{ name: 'settings' }"
    left-button-icon-name="back"
    :title="account.name"
    header-fill="light"
    fill="neutral"
  >
    <AeCard fill="maximum">
      <ListItemAccount
        v-bind="account"
        subtitle=""
      >
        <ButtonPlain
          slot="right"
          fill="primary"
          @click="disconnect"
        >
          Disconnect
        </ButtonPlain>
      </ListItemAccount>
    </AeCard>

    <AeAccountReverse
      v-bind="account"
      hide-toolbar
    />
  </MobilePage>
</template>

<script>
import { mapState } from 'vuex';
import MobilePage from '../../components/mobile/Page.vue';
import AeCard from '../../components/AeCard.vue';
import ListItemAccount from '../../components/ListItemAccount.vue';
import ButtonPlain from '../../components/ButtonPlain.vue';
import AeAccountReverse from '../../components/mobile/AeAccountReverse.vue';

export default {
  components: {
    MobilePage,
    AeCard,
    ListItemAccount,
    ButtonPlain,
    AeAccountReverse,
  },
  props: {
    idx: { type: String, required: true },
  },
  computed: mapState({
    account({ accounts: { list } }) {
      return list[+this.idx];
    },
  }),
  methods: {
    disconnect() {
      this.$router.push({ name: 'settings' });
      this.$store.commit('accounts/remove', this.idx);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/placeholders/typography.scss';
@import '../../styles/variables/colors.scss';

.button-plain {
  @extend %face-uppercase-xs;
  color: $color-primary;
  font-weight: 500;
}

.ae-account-reverse {
  margin-top: rem(20px);
}
</style>

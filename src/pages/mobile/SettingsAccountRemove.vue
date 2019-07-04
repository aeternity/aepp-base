<template>
  <MobilePage
    :left-button-to="{ name: 'settings' }"
    left-button-icon-name="back"
    :title="account.name"
    header-fill="light"
    fill="neutral"
    class="settings-account-remove"
  >
    <AeCard fill="maximum">
      <ListItemAccount v-bind="account">
        <AeButton
          slot="right"
          fill="primary"
          size="small"
          plain
          @click="disconnect"
        >
          Disconnect
        </AeButton>
      </ListItemAccount>
    </AeCard>

    <AeAccountReverse
      v-bind="account"
      hide-name
    />
  </MobilePage>
</template>

<script>
import { mapState } from 'vuex';
import MobilePage from '../../components/mobile/Page.vue';
import AeCard from '../../components/AeCard.vue';
import ListItemAccount from '../../components/ListItemAccount.vue';
import AeButton from '../../components/AeButton.vue';
import AeAccountReverse from '../../components/mobile/AeAccountReverse.vue';

export default {
  components: {
    MobilePage,
    AeCard,
    ListItemAccount,
    AeButton,
    AeAccountReverse,
  },
  props: {
    idx: { type: Number, required: true },
  },
  computed: mapState('accounts', {
    account({ list }, { getName }) {
      const account = list[this.idx];
      return {
        ...account,
        name: getName(account),
      };
    },
  }),
  methods: {
    disconnect() {
      this.$store.commit('accounts/remove', this.idx);
      this.$router.push({ name: 'settings' });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/globals/functions.scss';

.settings-account-remove .ae-account-reverse {
  margin-top: rem(20px);
}
</style>

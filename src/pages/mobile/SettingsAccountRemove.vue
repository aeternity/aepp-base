<template>
  <Page
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
          {{ $t('settings.account-remove.disconnect') }}
        </AeButton>
      </ListItemAccount>
    </AeCard>

    <AeAccountReverse
      v-bind="account"
      hide-name
    />
  </Page>
</template>

<script>
import { mapState } from 'vuex';
import Page from '../../components/Page.vue';
import AeCard from '../../components/AeCard.vue';
import ListItemAccount from '../../components/ListItemAccount.vue';
import AeButton from '../../components/AeButton.vue';
import AeAccountReverse from '../../components/mobile/AeAccountReverse.vue';

export default {
  components: {
    Page,
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
@import '../../styles/functions';

.settings-account-remove .ae-account-reverse {
  margin-top: rem(20px);
}
</style>

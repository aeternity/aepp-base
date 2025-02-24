<template>
  <Page
    :left-button-to="{ name: 'settings' }"
    left-button-icon-name="back"
    :title="$t('settings.password.title')"
    header-fill="light"
    fill="neutral"
    class="settings-password"
  >
    <AeCard fill="maximum">
      <ListItem
        :title="isWalletEncrypted ? $t('settings.password.change') : $t('settings.password.choose')"
        :subtitle="
          isWalletEncrypted
            ? $t('settings.password.change-subtitle')
            : $t('settings.password.choose-subtitle')
        "
        :to="{ name: 'settings-password-set' }"
      >
        <LeftMore slot="right" />
      </ListItem>
      <ListItemButton v-if="isWalletEncrypted" @click="() => changeWalletPassword()">
        {{ $t('settings.password.remove') }}
      </ListItemButton>
    </AeCard>
  </Page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Page from '../../components/Page.vue';
import AeCard from '../../components/AeCard.vue';
import ListItem from '../../components/ListItem.vue';
import { LeftMore } from '../../components/icons';
import ListItemButton from '../../components/ListItemButton.vue';

export default {
  components: {
    Page,
    AeCard,
    ListItem,
    LeftMore,
    ListItemButton,
  },
  computed: mapGetters('accounts/hdWallet', ['isWalletEncrypted']),
  methods: mapActions('accounts/hdWallet', ['changeWalletPassword']),
};
</script>

<style lang="scss" scoped>
@use '../../styles/variables';

.settings-password.page .list-item-button {
  color: variables.$color-primary;
}
</style>

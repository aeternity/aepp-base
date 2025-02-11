<template>
  <Page
    class="vault-setup-method"
    hide-tab-bar
    right-button-icon-name="close"
    :right-button-to="$globals.ROUTE_MOBILE_LOGGED_IN"
  >
    <template slot="title">
      {{ $t('air-gap.setup.title') }}
      <AeFraction numerator="1" denominator="3" />
    </template>
    <Guide :template="$t('air-gap.setup.method-guide')" fill="alternative">
      <AeFraction slot="icon" numerator="1" denominator="3" />
    </Guide>

    <ListItemChoose
      :title="$t('air-gap.setup.another-device.title')"
      :subtitle="$t('air-gap.setup.another-device.subtitle')"
      :active="maximumSecure"
      :checked="maximumSecure"
      @click="maximumSecure = true"
    >
      <img slot="icon" :src="mobilePhoneEmoji" />
    </ListItemChoose>
    <ListItemChoose
      :title="$t('air-gap.setup.same-device.title')"
      :subtitle="$t('air-gap.setup.same-device.subtitle')"
      :active="!maximumSecure"
      :checked="!maximumSecure"
      @click="maximumSecure = false"
    >
      <img slot="icon" :src="lockEmoji" />
    </ListItemChoose>

    <AeButton
      slot="footer"
      fill="alternative"
      :to="{ name: maximumSecure ? 'vault-setup-another-device' : 'vault-setup-same-device' }"
    >
      {{ $t('next') }}
    </AeButton>
  </Page>
</template>

<script>
import mobilePhoneEmoji from 'emoji-datasource-apple/img/apple/64/1f4f1.png';
import lockEmoji from 'emoji-datasource-apple/img/apple/64/1f512.png';
import Page from '../../components/Page.vue';
import Guide from '../../components/Guide.vue';
import AeFraction from '../../components/AeFraction.vue';
import ListItemChoose from '../../components/ListItemChoose.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: {
    Page,
    AeButton,
    Guide,
    AeFraction,
    ListItemChoose,
  },
  data: () => ({
    mobilePhoneEmoji,
    lockEmoji,
    maximumSecure: true,
  }),
};
</script>

<style lang="scss" scoped>
@use '../../styles/functions';
@use 'VaultSetup';

.vault-setup-method .guide {
  margin-bottom: functions.rem(79px);
}
</style>

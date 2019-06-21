<template>
  <MobilePage
    :header-fill="activeColor"
    right-button-icon-name="close"
    :right-button-to="{ name: 'name-list' }"
  >
    <template slot="header">
      <Guide fill="neutral">
        <em>Claim a name</em> for
        <AccountInline :address="active.address" />
      </Guide>

      <form :id="_uid">
        <AeInput
          v-model="name"
          v-validate="'required'"
          autofocus
          autocomplete="off"
          :error="errors.has('name')"
          :footer="errors.first('name')"
          name="name"
          header="Name"
          placeholder="Name"
          maxlength="16"
        />
      </form>
    </template>

    <AeButton
      fill="secondary"
      :form="_uid"
    >
      Register
    </AeButton>
  </MobilePage>
</template>

<script>
import { mapGetters } from 'vuex';
import MobilePage from '../../components/mobile/Page.vue';
import Guide from '../../components/Guide.vue';
import AeInput from '../../components/AeInput.vue';
import AccountInline from '../../components/AccountInline.vue';
import AeButton from '../../components/AeButton.vue';

export default {
  components: {
    MobilePage,
    Guide,
    AeInput,
    AccountInline,
    AeButton,
  },
  data: () => ({ name: '' }),
  computed: mapGetters('accounts', ['active', 'activeColor']),
};
</script>

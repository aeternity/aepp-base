<template>
  <mobile-page
    :left-button-to="{ name: 'settings-network' }"
    left-button-icon-name="back"
    title="Connect to another node"
    header-fill="light"
    fill="neutral"
    class="settings-network-new"
  >
    <ae-card fill="maximum">
      <guide>Connect to<br><em>another node</em></guide>
      <form @submit.prevent="addNetwork">
        <ae-input
          v-model="name"
          v-validate="'required'"
          :error="errors.has('name')"
          :footer="errors.first('name')"
          autofocus
          header="Node Name"
          name="name"
        />
        <ae-input
          v-model="url"
          v-validate="{
            required: true,
            url_http: true,
            excluded: networks.map(({ url }) => url),
          }"
          :error="errors.has('url')"
          :footer="errors.first('url')"
          header="Node URL"
          name="url"
        />
        <ae-button
          :disabled="errors.any()"
          fill="secondary"
        >
          Connect
        </ae-button>
        <ae-button
          :to="{ name: 'settings-network' }"
          plain
        >
          Cancel
        </ae-button>
      </form>
    </ae-card>
  </mobile-page>
</template>

<script>
import { mapGetters } from 'vuex';
import MobilePage from '../../components/MobilePage.vue';
import AeCard from '../../components/AeCard.vue';
import Guide from '../../components/Guide.vue';
import AeInput from '../../components/AeInput.vue';
import AeButton from '../../components/AeButton.vue';
import { toUrl } from '../../lib/utils';

export default {
  components: {
    MobilePage,
    AeCard,
    Guide,
    AeInput,
    AeButton,
  },
  data: () => ({
    name: '',
    url: '',
  }),
  computed: mapGetters(['networks']),
  methods: {
    async addNetwork() {
      if (!await this.$validator.validateAll()) {
        return;
      }

      const url = toUrl(this.url).toString();
      this.$store.commit('addNetwork', {
        name: this.name,
        url,
      });
      this.$store.commit('setRPCUrl', url);
      this.$router.push({ name: 'settings-network' });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';
@import '~@aeternity/aepp-components-3/src/styles/variables/colors.scss';

.settings-network-new {
  .ae-card {
    padding: 0 rem(20px);

    .guide {
      margin-top: rem(27px);
    }

    .ae-input + .ae-button {
      margin-top: rem(32px);
    }

    .ae-button {
      display: block;
      min-width: rem(250px);
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>

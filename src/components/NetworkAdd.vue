<template>
  <div class="network-add">
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
        :to="finallyTo"
        type="button"
        plain
        @click="$emit('finally')"
      >
        Cancel
      </ae-button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Guide from './Guide.vue';
import AeInput from './AeInput.vue';
import AeButton from './AeButton.vue';
import { toUrl } from '../lib/utils';

export default {
  components: {
    Guide,
    AeInput,
    AeButton,
  },
  props: {
    finallyTo: { type: [Object, String], default: null },
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
      if (this.finallyTo) this.$router.push(this.finallyTo);
      this.$emit('finally');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@aeternity/aepp-components-3/src/styles/globals/functions.scss';

.network-add {
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
</style>

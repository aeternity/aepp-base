<template>
  <div class="network-add">
    <Guide>Connect to<br><em>another node</em></Guide>
    <form @submit.prevent="addNetwork">
      <AeInput
        v-model="name"
        v-validate="'required'"
        :error="errors.has('name')"
        :footer="errors.first('name')"
        autofocus
        header="Node Name"
        name="name"
      />
      <AeInput
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
      <AeButton
        :disabled="errors.any()"
        fill="secondary"
      >
        Connect
      </AeButton>
      <AeButton
        :to="finallyTo"
        v-bind="!finallyTo && { type: 'button' }"
        plain
        @click="$emit('finally')"
      >
        Cancel
      </AeButton>
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
      this.$store.commit('setSdkUrl', url);
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
    min-width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>

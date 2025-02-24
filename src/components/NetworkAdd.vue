<template>
  <div class="network-add">
    <Guide :template="$t('network.settings.new.guide')" />
    <form @submit.prevent="addNetwork">
      <AeInput
        v-model="name"
        v-validate="'required'"
        :error="errors.has('name')"
        :footer="errors.first('name')"
        autofocus
        :header="$t('network.settings.new.node-name')"
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
        :header="$t('network.settings.new.node-url')"
        name="url"
      />
      <AeButton :disabled="errors.any()" fill="secondary">
        {{ $t('network.settings.new.connect') }}
      </AeButton>
      <AeButton
        :to="finallyTo"
        v-bind="!finallyTo && { type: 'button' }"
        plain
        @click="$emit('finally')"
      >
        {{ $t('cancel') }}
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
      if (!(await this.$validator.validateAll())) {
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
@use '../styles/functions';

.network-add {
  padding: 0 functions.rem(20px);

  .guide {
    margin-top: functions.rem(27px);
  }

  .ae-input + .ae-button {
    margin-top: functions.rem(32px);
  }

  .ae-button {
    display: block;
    min-width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>

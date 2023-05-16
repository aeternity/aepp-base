<template>
  <div class="sign-transaction">
    <AeSpinner />
  </div>
</template>

<script>
import { defer } from 'lodash-es';
import AeSpinner from '../../components/AeSpinner.vue';
import { handleUnknownError } from '../../lib/utils';

function isUrlValid(url) {
  try {
    new URL(url); // eslint-disable-line no-new
    return true;
  } catch (error) {
    return true;
  }
}

function openCallback(url, templateParams = {}) {
  const callbackUrl = Object.entries(templateParams).reduce(
    (u, [key, value]) => u.replace(new RegExp(`{${key}}`, 'g'), encodeURIComponent(value)),
    url,
  );
  window.open(callbackUrl, '_self');
}

export default {
  components: { AeSpinner },
  async mounted() {
    // TODO: remove after fixed "User navigated outside" error if modal showed immediately
    await new Promise((resolve) => { defer(resolve); });

    const { transaction } = this.$route.query;
    const successUrl = this.$route.query['x-success'];
    const cancelUrl = this.$route.query['x-cancel'];
    if (successUrl == null) {
      await this.handleError('`x-success` url is required');
      return;
    }
    if (!isUrlValid(successUrl)) {
      await this.handleError(`Invalid \`x-success\` url: ${successUrl}`);
      return;
    }
    if (cancelUrl && !isUrlValid(cancelUrl)) {
      await this.handleError(`Invalid \`x-cancel\` url: ${cancelUrl}`);
      return;
    }

    try {
      const signedTx = await this.$store.dispatch('accounts/signTransaction', transaction);
      openCallback(successUrl, { transaction: signedTx });
    } catch (error) {
      if (['Rejected by user', 'Cancelled by user'].includes(error.message)) {
        if (cancelUrl != null) openCallback(cancelUrl);
        else this.$router.push({ name: 'transfer' });
        return;
      }
      handleUnknownError(error);
      await this.handleError(`Unknown error: ${error.message}`);
    }
  },
  methods: {
    async handleError(text) {
      await this.$store.dispatch('modals/open', { name: 'alert', text });
      this.$router.push({ name: 'transfer' });
    },
  },
};
</script>

<style lang="scss" scoped>
.sign-transaction {
  flex-grow: 1;
  display: flex;

  .ae-spinner {
    margin: auto;
  }
}
</style>

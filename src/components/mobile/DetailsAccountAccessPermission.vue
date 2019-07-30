<template>
  <div class="details-account-access-permission">
    <DetailsPermission :name="$t('app.browser.confirm-account-access.address.name')">
      {{ $t('app.browser.confirm-account-access.address.explanation') }}
    </DetailsPermission>

    <DetailsPermission :name="$t('app.browser.confirm-account-access.transactions.name')">
      {{ $t('app.browser.confirm-account-access.transactions.explanation', { appName }) }}
    </DetailsPermission>
  </div>
</template>

<script>
import DetailsPermission from './DetailsPermission.vue';

export default {
  components: { DetailsPermission },
  props: {
    appName: { type: String, required: true },
  },
};
</script>

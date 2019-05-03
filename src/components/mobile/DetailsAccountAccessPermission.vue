<template>
  <div class="details-account-access-permission">
    <DetailsPermission name="Address">
      This aepp asks for access your public address.
    </DetailsPermission>

    <DetailsPermission name="Transactions">
      {{ appName }} involves an auction.
      The æpp will prepare a transaction, you are in charge of confirming it.
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

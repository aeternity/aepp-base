<template>
  <ae-modal-light
    v-if="app"
    :title="`Delete \x22${app.name}\x22?`"
    @close="selectAppToRemove()"
  >
    You can easily add this æpp again, if you are regretting this action

    <template slot="buttons">
      <ae-button
        size="small"
        type="exciting"
        plain
        uppercase
        @click="selectAppToRemove()"
      >
        cancel
      </ae-button>

      <ae-button
        size="small"
        type="dramatic"
        plain
        uppercase
        @click="removeSelectedApp"
      >
        delete
      </ae-button>
    </template>
  </ae-modal-light>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { AeModalLight, AeButton } from '@aeternity/aepp-components';
import { appsRegistry } from '../lib/appsRegistry';

export default {
  components: { AeModalLight, AeButton },
  computed: mapState({
    app: ({ apps, selectedAppIdxToRemove: appIdx }) => appIdx !== -1 && ({
      ...apps[appIdx],
      ...appsRegistry[apps[appIdx]],
    }),
  }),
  methods: mapMutations(['selectAppToRemove', 'removeSelectedApp']),
};
</script>

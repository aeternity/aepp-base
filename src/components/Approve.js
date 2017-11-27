import { mapState } from 'vuex';
import { focus } from 'vue-focus';

import {
  AeModal,
  AeHeaderButton,
  AeAmount,
  AeButton,
  AeBalance,
  AeAppIcon
} from '@aeternity/aepp-components'

export default {
  name : 'approve',
  data() {
    return {
      revenue: 1,
      appName : 'AppName'
    };
  },
  components: {
    AeModal,
    AeHeaderButton,
    AeAmount,
    AeButton,
    AeBalance,
    AeAppIcon
  },
  directives: { focus },
  computed: mapState({
    recordId: state => 1234
  }),
  methods: {
    closeHandler() {
      //this.$store.commit('showSupportModalForRecord');
    },
    async likeRecord() {
      const { recordId, revenue } = this;
      //await this.$store.dispatch('likeRecord', { recordId, revenue: +revenue });
      this.closeHandler();
    },
  },
};

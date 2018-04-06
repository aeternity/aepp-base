<template>
  <modal-screen class="aens-list" title="AENS List" :redirectToOnClose="{ name: 'apps' }">
    <aens-entry v-for="domain in myDomains" :key="domain.domain" :domain="domain"></aens-entry>
    <fixed-add-button quick-id :to="{ name: 'aens-wizard' }" />
    <quick-id />
  </modal-screen>
</template>


<script>
import { mapGetters } from 'vuex'
import QuickId from '@/components/QuickId.vue'
import ModalScreen from '@/components/ModalScreen'
import AensEntry from '@/components/AensEntry'
import FixedAddButton from '@/components/FixedAddButton.vue'

export default {
  name: 'aens-list',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'myDomains'
    ])
  },
  components: {
    QuickId,
    ModalScreen,
    AensEntry,
    FixedAddButton
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="css" scoped>
.aens {

}
</style>

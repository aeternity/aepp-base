<template>
  <modal-page class="aens-list" title="AENS List" :redirectToOnClose="{ name: 'apps' }">
    <aens-entry v-for="domain in myDomains" :key="domain.domain" :domain="domain"></aens-entry>
    <fixed-add-button quick-id :to="{ name: 'aens-wizard' }" />
    <quick-id />
  </modal-page>
</template>


<script>
import { mapGetters } from 'vuex'
import QuickId from '@/components/QuickId.vue'
import ModalPage from '@/components/ModalPage.vue'
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
    ModalPage,
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

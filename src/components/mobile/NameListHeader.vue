<template>
  <div class="name-list-header">
    <Guide>
      <em>{{ $t('name.title') }}</em>
    </Guide>

    <ButtonGroup>
      <ButtonFlat :to="{ name: 'name-list', params: { view: 'ending-soonest' } }">
        <Clock />
      </ButtonFlat>
      <ButtonFlat :to="{ name: 'name-list-character-length' }">
        3-4…
      </ButtonFlat>
      <ButtonFlat :to="{ name: 'name-list', params: { view: 'max-bid' } }">
        <ArrowChart />
      </ButtonFlat>
      <ButtonFlat
        :to="{ name: 'name-list-personal' }"
        highlighted-when-exact-active
      >
        <Contacts />
      </ButtonFlat>
    </ButtonGroup>
  </div>
</template>

<script>
import Guide from '../Guide.vue';
import ButtonGroup from './ButtonGroup.vue';
import ButtonFlat from './ButtonFlat.vue';
import { Clock, ArrowChart, Contacts } from '../icons';

export default {
  components: {
    Guide, ButtonGroup, ButtonFlat, Clock, ArrowChart, Contacts,
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/functions';

.name-list-header {
  margin-bottom: rem(30px);
}
</style>
